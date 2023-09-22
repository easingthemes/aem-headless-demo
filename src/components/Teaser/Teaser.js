import './Teaser.css';
import { Link } from 'react-router-dom';

function Teaser({ item, isPaginated }) {
  const date = new Date(item.scheduledAt);
  const day = date.toLocaleDateString('de-DE');
  const time = date.toLocaleTimeString('de-DE', {hour: '2-digit', minute:'2-digit'});
  const Day = isPaginated ? <small>{day}</small> : '';
  const ItemLink = item.speaker ? <Link to={`page${item._path}`}>{item.name}</Link> : item.name;
  return (
    <tr className="table__row">
      <td className="table__cell">{time} {Day}</td>
      <td className="table__cell">
        {ItemLink}
      </td>
      <td className="table__cell">{item.speaker}</td>
    </tr>
  );
}

export default Teaser;
