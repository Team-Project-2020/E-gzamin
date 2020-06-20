import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';

const AuthRoute: React.FC<any> = ({
  match: { path },
}: {
  match: { path: string };
}) => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path={`${path}/register`} component={Register} />
          <Route exact path={`${path}/login`} component={Login} />
          <Redirect to="/auth/login" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default AuthRoute;
