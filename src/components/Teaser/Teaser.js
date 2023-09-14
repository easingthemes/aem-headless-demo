import './Teaser.css';

function Teaser({ item }) {
  return (
    <div className="teaser">
      <img src={`http://localhost:4502${item.primaryImage._path}/jcr:content/renditions/cq5dam.thumbnail.319.319.png`} alt={item.title}/>
      <h2>{item.title}</h2>
      <span>{item.activity}</span>
    </div>
  );
}

export default Teaser;
