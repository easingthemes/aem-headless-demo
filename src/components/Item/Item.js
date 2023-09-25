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
  
  if (!data.name) {
    return (
      <div className="article article--empty"></div>
    );
  }
  
  const date = new Date(data.scheduledAt);
  const localDate = date.toLocaleString('de-DE');
  
  return (
    <div className="article">
      <div className="article__content">
        <h2>{data.name}</h2>
        <div>{localDate}</div>
        <div dangerouslySetInnerHTML={{ __html: data.description.html }}></div>
        <hr/>
        <div>{data.speaker}</div>
      </div>
    </div>
  );
}

export default Item;
