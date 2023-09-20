import { useRef } from 'react';
import { API_CONFIG } from '../../api/config';
import './Teaser.css';

function Teaser({ item, openArticle }) {
  const el = useRef(null);
  
  return (
    <div className="teaser" ref={el}>
      <img src={`${API_CONFIG.serviceURL}${item.primaryImage._path}/jcr:content/renditions/cq5dam.thumbnail.319.319.png`}
           alt={item.title}
           onClick={() => openArticle(item._path, el)}/>
      <div className="teaser__content">
        <h2>{item.title}</h2>
        <span>{item.activity}</span>
      </div>
    </div>
  );
}

export default Teaser;
