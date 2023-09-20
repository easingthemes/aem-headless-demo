import Teaser from '../Teaser/Teaser';
import './TeaserList.css';
import LoadMore from '../LoadMore/LoadMore';

function TeaserList({ data, openArticle, loadMore, isDone }) {
  const teasers = data.map((item, i) => {
    return (
      <li key={`teaser-${i}`} className="teaser-list__item">
        <Teaser item={item} openArticle={openArticle} />
      </li>
    );
  });
  
  return (
    <div className="teaser-list">
      <ul className="teaser-list__items">
        {teasers}
      </ul>
      <LoadMore loadMore={loadMore} isDone={isDone} />
    </div>
  );
}

export default TeaserList;
