import React, { ReactElement } from 'react';
import { Route, Redirect } from 'react-router-dom';

import isLoggedIn from '../lib/isLoggedIn';

type PublicRouteProps = {
  component: React.FC;
  exact?: boolean;
  path: string;
};
const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...restProps
}) => {
  const isUserLoggedIn = isLoggedIn();
  return (
    <Route
      {...restProps}
      render={(props: any): ReactElement =>
        !isUserLoggedIn ? <Component {...props} /> : <Redirect to="/egzamin" />
      }
    />
  );
};

export default PublicRoute;
