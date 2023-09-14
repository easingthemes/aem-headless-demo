import React, { useEffect, useMemo, useState } from 'react';
import { API } from '../../api/api';

function DataLoader({ action, children }) {
  const api = useMemo(() => new API(), []);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!action) {
      setError(new Error('API action missing!'));
      return;
    }
    
    if (typeof api[action] !== 'function') {
      setError(new Error('API action is not defined!'));
      return;
    }
    
    (async () => {
      const { data, error } = await api[action]();
      if (error) {
        setError(error);
      }
      
      if (data) {
        setData(data);
      }
    })();
  }, [api, action]);
  
  if (error) {
    return <div>Error { error.message }</div>;
  }
  
  if (!data) {
    return <div>...Loading...</div>;
  }
  
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      data,
    });
  });
}

export default DataLoader;