import './App.css';
import TeaserList from './components/TeaserList/TeaserList';
import DataLoader from './components/DataLoader/DataLoader';
import { MODELS } from './api/queries';
import Filters from './components/Filters/Filters';
import { useState } from 'react';

function App() {
  const [activeItem, setActiveItem] = useState(null);
  const filter = activeItem ? { activity: activeItem } : null;
  return (
    <div className="App">
      <header className="App-header">
        <span>
          AEM Headless Demo
        </span>
      </header>
      <main>
        <h1>{MODELS.adventure.name}</h1>
        <DataLoader action="fetchCachedItems">
          <Filters setActiveItem={setActiveItem} activeItem={activeItem} />
        </DataLoader>
        <DataLoader model={MODELS.adventure} filter={filter}>
          <TeaserList />
        </DataLoader>
      </main>
      <footer className="App-footer">
        <span>
          2023
        </span>
      </footer>
    </div>
  );
}

export default App;
