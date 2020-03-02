import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) =>
{
  let RequiredType = rest.type;

  const token = window.localStorage.getItem("auth");
  const type = window.localStorage.getItem("class");

  if (!type)
    return <Redirect to="/login" />;

  if (type < RequiredType)
    return <Redirect to="/products" />;

  return (
    <Route
      {...rest}
      render={props => {
        return ( token ? <Component {...props} /> : <Redirect to="/login" />);
      }}
    />
  );
};

export default PrivateRoute;