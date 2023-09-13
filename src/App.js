import './App.css';
import { API } from './api';

function App() {
  const api = new API();
  api.init();
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          AEM Headless Demo
        </a>
      </header>
      <div>
      
      </div>
    </div>
  );
}

export default App;
