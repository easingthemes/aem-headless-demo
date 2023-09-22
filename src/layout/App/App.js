import { useMemo } from 'react';
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import { API } from '../../api/api';
import Home from '../../pages/Home/Home';
import Page from '../../pages/Page/Page';
import './App.css';

const getRouter = (api) => {
  return createHashRouter([
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: "/page/*",
      id: "page",
      loader: async ({ params }) => {
        const _path = `/${params["*"]}`;
        const { data, error } = await api.fetchByPath(_path);
        return { data, error };
      },
      element: <Page/>,
    },
  ]);
}

function App() {
  const api = useMemo(() => new API(), []);
  const router = getRouter(api);
  
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">AEM Headless Demo</a>
      </header>
      <RouterProvider router={router} />
      <footer className="App-footer">
        <span>Dragan Filipovic 2023</span>
      </footer>
    </div>
  );
}

export default App;
