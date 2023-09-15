import './Filters.css';

function Filters({ data, activeItem, setActiveItem }) {
  const activities = [...new Set(data.map(({ activity }) => activity))];
  const filters = activities.map((activity, i) => {
    const isActive = activeItem === activity;
    return (
      <li key={`filter-${i}`} className="filters__item">
        <button onClick={() => setActiveItem(activity)} disabled={isActive}>{activity}</button>
      </li>
    );
  });

  return (
    <div className="filters">
      <ul className="filters__items">
        <li key={`filter-all`} className="filters__item">
          <button onClick={() => setActiveItem(null)} disabled={!activeItem}>All</button>
        </li>
        {filters}
      </ul>
    </div>
  );
}

export default Filters;
