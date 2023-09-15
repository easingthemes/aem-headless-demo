import './Teaser.css';
import { useRef } from 'react';

function Teaser({ item, openArticle }) {
  const el = useRef(null);
  
  return (
    <div className="teaser" ref={el}>
      <img src={`http://localhost:4502${item.primaryImage._path}/jcr:content/renditions/cq5dam.thumbnail.319.319.png`}
           alt={item.title}
           onClick={() => openArticle(item._path, el)}/>
      <h2>{item.title}</h2>
      <span>{item.activity}</span>
    </div>
  );
}

export default Teaser;
