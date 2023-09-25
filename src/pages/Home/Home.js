import { useState } from 'react';
import { MODELS } from '../../api/queries';
import DataLoader from '../../components/DataLoader/DataLoader';
import TeaserList from '../../components/TeaserList/TeaserList';
import Filters from '../../components/Filters/Filters';
import './Home.css';

function Home() {
  const [activeItem, setActiveItem] = useState(undefined);
  
  const updateActiveItem = (activity) => {
    document.startViewTransition(() => {
      setActiveItem(activity);
    });
  }
  // For DEMO only: 2 different query types
  let itemsModel;
  let variables = {};
  if (!activeItem) {
    // Pagination for ALL items
    itemsModel = {
      ...MODELS.items,
      config: {
        pageSize: 9
      }
    };
  } else {
    // List for filtered items
    itemsModel = MODELS.query;
    const after = new Date(activeItem);
    const before = new Date(activeItem)
    before.setDate(after.getDate() + 1);
    variables = {
      before,
      after
    }
  }

  return (
    <main className="schedule">
      <h1>{MODELS.items.name}</h1>
      <DataLoader model={MODELS.filters}>
        <Filters updateActiveItem={updateActiveItem} activeItem={activeItem} />
      </DataLoader>
      <DataLoader model={itemsModel} variables={variables}>
        <TeaserList />
      </DataLoader>
    </main>
  );
}

export default Home;
