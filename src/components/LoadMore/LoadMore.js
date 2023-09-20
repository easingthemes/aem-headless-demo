import './LoadMore.css';

function LoadMore({ loadMore, isDone }) {
  return (
    <button onClick={() => loadMore()} disabled={isDone}>Load More</button>
  );
}

export default LoadMore;
