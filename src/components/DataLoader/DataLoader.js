import React, { useEffect, useMemo, useState } from 'react';
import { API } from '../../api/api';
import { Loading } from '../Loading/Loading';

function DataLoader({ action, variables, model, _path, filter, children }) {
  const api = useMemo(() => new API(), []);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const apiAction = model ? 'fetchItemsForModel' : action;
    
    if (!apiAction) {
      setError(new Error('API action missing!'));
      return;
    }
    
    if (typeof api[apiAction] !== 'function') {
      setError(new Error('API action is not defined!'));
      return;
    }
    
    if (_path === null) {
      setData({});
      return;
    }
    
    (async () => {
      const { data, error } = await api[apiAction]({ model, _path, filter, variables });
      if (error) {
        setError(error);
      }
      
      if (data) {
        setData(data);
      }
    })();
  }, [api, action, variables, model, _path, filter]);
  
  if (error) {
    return <div>Error { error.message }</div>;
  }
  
  if (!data) {
    return <Loading label="results"/>;
  }
  
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      data,
    });
  });
}

export default DataLoader;
