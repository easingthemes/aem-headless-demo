import { API_CONFIG } from '../../api/config';
import './Item.css';

function Item({ data }) {
  if (!data) {
    return (
      <div className="article">
        <div className="article__content">
          <h2>No data</h2>
        </div>
      </div>
    );
  }
  
  if (!data.title) {
    return (
      <div className="article article--empty"></div>
    );
  }
  
  return (
    <div className="article">
      <div className="article__content">
        <img src={`${API_CONFIG.serviceURL}${data.primaryImage._path}`} alt={data.title}/>
        <h2>{data.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.description.html }}></div>
        <hr/>
        <div dangerouslySetInnerHTML={{ __html: data.itinerary.html }}></div>
      </div>
    </div>
  );
}

export default Item;
