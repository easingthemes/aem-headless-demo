import './LoadMore.css';

function LoadMore({ loadMore, hasMore }) {
  return (
    <button onClick={() => loadMore()} disabled={!hasMore}>Load More</button>
  );
}

export default LoadMore;
