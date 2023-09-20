import './App.css';
import TeaserList from './components/TeaserList/TeaserList';
import DataLoader from './components/DataLoader/DataLoader';
import { MODELS } from './api/queries';
import Filters from './components/Filters/Filters';
import { useRef, useState } from 'react';
import Article from './components/Article/Article';

function App() {
  const [activeItem, setActiveItem] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [activeArticle, setActiveArticle] = useState(null);
  const filter = activeItem ? { activity: activeItem } : null;
  const mainEl = useRef(null);
  
  const openArticle = (_path, el) => {
    document.startViewTransition(() => {
      setActiveArticle(_path);
      setActiveElement(el);
      mainEl.current.scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  const closeArticle = () => {
    document.startViewTransition(() => {
      setActiveArticle(null);
      activeElement.current.classList.add('teaser--active');
      activeElement.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        activeElement.current.classList.remove('teaser--active');
      }, 2000);
    });
  }
  
  const updateActiveItem = (activity) => {
    document.startViewTransition(() => {
      setActiveItem(activity);
    });
  }
  
  const modalClass = activeArticle ? 'App--modal' : '';
  return (
    <div className={`App ${modalClass}`}>
      <header className="App-header">
        <span>AEM Headless Demo</span>
      </header>
      <main ref={mainEl}>
        <h1>{MODELS.adventure.name}</h1>
        <DataLoader model={MODELS.activities}>
          <Filters setActiveItem={updateActiveItem} activeItem={activeItem} />
        </DataLoader>
        <DataLoader model={MODELS.adventure} filter={filter}>
          <TeaserList openArticle={openArticle} />
        </DataLoader>
        <DataLoader model={MODELS.article} _path={activeArticle}>
          <Article closeArticle={closeArticle} />
        </DataLoader>
      </main>
      <footer className="App-footer">
        <span>Dragan Filipovic 2023</span>
      </footer>
      <div className="modal__bg" onClick={closeArticle}></div>
    </div>
  );
}

export default App;
