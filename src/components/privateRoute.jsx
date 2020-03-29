import React from 'react';

import { navigate } from 'gatsby';

function PrivateRoute({ component: Component, location, ...rest }) {
  // TODO get user
  let user = true;

  if (!user && location.pathname !== '/login') {
    navigate('/login');
    return null;
  }

  return <Component {...rest} />;
}

export default PrivateRoute;
