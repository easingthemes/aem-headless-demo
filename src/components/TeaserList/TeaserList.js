import Teaser from '../Teaser/Teaser';
import './TeaserList.css';
import LoadMore from '../LoadMore/LoadMore';

function TeaserList({ data, openArticle, loadMore, hasMore }) {
  const teasers = data.map((item, i) => {
    return (
      <li key={`teaser-${i}`} className="teaser-list__item">
        <Teaser item={item} openArticle={openArticle} />
      </li>
    );
  });
  const Button = typeof hasMore === 'boolean' ? <LoadMore loadMore={loadMore} hasMore={hasMore} /> : null;
  return (
    <div className="teaser-list">
      <ul className="teaser-list__items">
        {teasers}
      </ul>
      {Button}
    </div>
  );
}

export default TeaserList;
