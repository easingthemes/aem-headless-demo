import React, { useEffect, useMemo, useRef, useState } from 'react';
import { API } from '../../api/api';
import { Loading } from '../Loading/Loading';

function DataLoader({ model, _path, filter, variables, children }) {
  const api = useMemo(() => new API(), []);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isDone, setIsDone] = useState(false);
  const cursorQuery = useRef(null);
  
  const loadMore = () => {
    cursorQuery.current.next()
      .then(({ done, value }) => {
        if (!done) {
          setData([...(data || []), ...value]);
        } else {
          setIsDone(true);
        }
      })
      .catch((e) => {
        setError(e);
      })
  }
  
  useEffect(() => {
    const apiAction = 'fetchItemsForModel';
    const isPaginated = model.config && model.config.pageSize;
    
    if (typeof api[apiAction] !== 'function') {
      setError(new Error('API action is not defined!'));
      return;
    }
    
    // _path is defined
    if (_path === null) {
      setData({});
      return;
    }
    
    (async () => {
      if (isPaginated) {
        cursorQuery.current = await api.initPaginatedQuery(model);
        loadMore();
        return;
      }
      
      const { data: apiData, error: apiError } = await api[apiAction]({ model, _path, filter, variables, cursorQuery: cursorQuery.current });

      if (apiError) {
        setError(apiError);
      }
      
      if (apiData) {
        if (isPaginated) {
          setData(apiData);
        } else {
          setData(apiData);
        }
      }
    })();
  }, [api, model, _path, filter, variables]);
  
  if (error) {
    return <div>Error { error.message }</div>;
  }
  
  if (!data) {
    return <Loading label="results"/>;
  }
  
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      data,
      loadMore,
      isDone
    });
  });
}

export default DataLoader;
