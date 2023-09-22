import './LoadMore.css';

function LoadMore({ loadMore, hasMore }) {
  return (
    <button className="load-more" onClick={() => loadMore()} disabled={!hasMore}>Load More</button>
  );
}

export default LoadMore;
