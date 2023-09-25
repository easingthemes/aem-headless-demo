import './Loading.css';

function Loading({ label }) {
  const renderLabel = () => {
    if (!label) {
      return null;
    }
    
    return <div className="dot-label">Loading: { label }</div>;
  }
  
  const labelEl = renderLabel();
  
  return(
    <div className="dot__wrapper">
      <div className="dot__icons">
        <div className="dot-pulse"></div>
      </div>
      {labelEl}
    </div>
  );
}

export default Loading;
