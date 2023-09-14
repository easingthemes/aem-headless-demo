import './App.css';
import TeaserList from './components/TeaserList/TeaserList';
import DataLoader from './components/DataLoader/DataLoader';
import { ACTIONS } from './api/actions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>
          AEM Headless Demo
        </span>
      </header>
      <main>
        <DataLoader action={ACTIONS.fetchItems}>
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
