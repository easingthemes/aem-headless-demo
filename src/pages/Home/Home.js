import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODELS } from '../../api/queries';
import DataLoader from '../../components/DataLoader/DataLoader';
import TeaserList from '../../components/TeaserList/TeaserList';
import Filters from '../../components/Filters/Filters';
import './Home.css';

function Home() {
  const [activeItem, setActiveItem] = useState(undefined);
  const navigate = useNavigate();
  
  const openArticle = (_path, el) => {
    document.startViewTransition(() => {
      navigate(`page${_path}`);
    });
  }
  
  const updateActiveItem = (activity) => {
    document.startViewTransition(() => {
      setActiveItem(activity);
    });
  }
  // For DEMO only: 2 different query types
  let itemsModel;
  if (!activeItem) {
    // Pagination for ALL items
    itemsModel = {
      ...MODELS.items,
      config: {
        pageSize: 6
      }
    };
  } else {
    // List for filtered items
    itemsModel = MODELS.query;
  }

  return (
    <main>
      <h1>{MODELS.items.name}</h1>
      <DataLoader model={MODELS.filters}>
        <Filters updateActiveItem={updateActiveItem} activeItem={activeItem} />
      </DataLoader>
      <DataLoader model={itemsModel} filterVal={activeItem}>
        <TeaserList openArticle={openArticle} />
      </DataLoader>
    </main>
  );
}

export default Home;
