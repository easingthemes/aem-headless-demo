import './Filters.css';

function Filters({ data, activeItem, updateActiveItem }) {
  const days = [...new Set(data.map(({ scheduledAt }) => {
    return scheduledAt.split('T')[0];
  }))];
  const filters = days.map((day, i) => {
    const isActive = activeItem === day;
    return (
      <button key={i} onClick={() => updateActiveItem(day)} disabled={isActive}>Day {i + 1}</button>
    );
  });

  return (
    <div className="filters">
      <button onClick={() => updateActiveItem(undefined)} disabled={!activeItem}>All</button>
      {filters}
    </div>
  );
}

export default Filters;
