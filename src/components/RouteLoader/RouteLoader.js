import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../Loading/Loading';

function RouteLoader({ children }) {
  const { data, error } = useLoaderData();
  if (error) {
    return <div>Error { error.message }</div>;
  }
  
  if (!data) {
    return <Loading label="results"/>;
  }
  
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      data
    });
  });
}

export default RouteLoader;
