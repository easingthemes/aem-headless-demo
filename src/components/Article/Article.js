import { API_CONFIG } from '../../api/config';
import './Article.css';

function Article({ data, closeArticle, params }) {
  if (!data) {
    return (
      <div className="article">
        <div className="article__content">
          <button className="close" onClick={() => closeArticle()}><span className="visually-hidden">close</span></button>
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
        <button className="close" onClick={() => closeArticle()}><span className="visually-hidden">close</span></button>
        <img src={`${API_CONFIG.serviceURL}${data.primaryImage._path}`} alt={data.title}/>
        <h2>{data.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: data.description.html }}></div>
        <hr/>
        <div dangerouslySetInnerHTML={{ __html: data.itinerary.html }}></div>
      </div>
    </div>
  );
}

export default Article;
