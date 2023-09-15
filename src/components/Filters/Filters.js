import './Filters.css';

function Filters({ data, activeItem, setActiveItem }) {
  const updateActiveItem = (activity) => {
    document.startViewTransition(() => {
      setActiveItem(activity);
    });
  }
  const activities = [...new Set(data.map(({ activity }) => activity))];
  const filters = activities.map((activity, i) => {
    const isActive = activeItem === activity;
    return (
      <li key={`filter-${i}`} className="filters__item">
        <button onClick={() => updateActiveItem(activity)} disabled={isActive}>{activity}</button>
      </li>
    );
  });

  return (
    <div className="filters">
      <ul className="filters__items">
        <li key={`filter-all`} className="filters__item">
          <button onClick={() => updateActiveItem(null)} disabled={!activeItem}>All</button>
        </li>
        {filters}
      </ul>
    </div>
  );
}

export default Filters;
