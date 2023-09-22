import Teaser from '../Teaser/Teaser';
import './TeaserList.css';
import LoadMore from '../LoadMore/LoadMore';

function TeaserList({ data, loadMore, hasMore }) {
  const isPaginated = typeof hasMore === 'boolean';
  const teasers = data.map((item, i) => {
    return (
      <Teaser key={`teaser-${i}`} item={item} isPaginated={isPaginated} />
    );
  });
  const date = new Date(data[0].scheduledAt);
  const localDate = isPaginated ? `All days`: date.toLocaleDateString('de-DE');
  const Button = isPaginated ? <LoadMore loadMore={loadMore} hasMore={hasMore} /> : null;
  return (
    <div className="tab-content">
      <h4>{localDate}</h4>
      <table className="table">
        <thead><tr><th className="time">Time</th><th className="title">Topic</th><th className="speaker">Speaker</th></tr></thead>
        <tbody>
        {teasers}
        </tbody>
      </table>
      {Button}
    </div>
  );
}

export default TeaserList;
