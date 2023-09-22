import React, { useEffect, useMemo, useState } from 'react';
import { API } from '../../api/api';
import Loading from '../Loading/Loading';

function DataLoader({ model, _path, filterVal, variables, children }) {
  const api = useMemo(() => new API(model), [model]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    const isPaginated = model?.config?.pageSize;
    
    (async () => {
      if (!isMounted) {
        return;
      }
      let result;
      if (model?.path) {
        result = await api.fetchCached({ model })
      } else if (isPaginated) {
        result = await api.fetchPaginated()
      } else {
        result = await api.fetchList(model, { filterVal });
      }

      const { data, error, hasNext } = result;
      if (error) {
        setError(error);
      }
      if (data) {
        setData(data);
      }
      setHasMore(hasNext);
    })();
    
    return () => {
      isMounted = false
    }
  }, [api, model, _path, filterVal, variables]);
  
  if (error) {
    return <div>Error { error.message }</div>;
  }
  
  if (!data) {
    return <Loading label="results"/>;
  }
  
  const loadMore = () => {
    api.fetchPaginated()
      .then(({ data: moreData, error, hasNext }) => {
        if (data) {
          setData([...(data || []), ...moreData]);
        }
        if (error) {
          setError(error);
        }
        setHasMore(hasNext);
      });
  }
  
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      data,
      hasMore,
      loadMore
    });
  });
}

export default DataLoader;
