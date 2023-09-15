import Teaser from '../Teaser/Teaser';
import './TeaserList.css';

function TeaserList({ data, openArticle }) {
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
    </div>
  );
}

export default TeaserList;
