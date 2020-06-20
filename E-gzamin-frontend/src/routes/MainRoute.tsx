import React, { ReactElement } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import AddQuest from '../components/AddQuest';
import Group from '../components/Group';
import Home from '../components/Home';
import MakeTest from '../components/MakeTest';
import Settings from '../components/Settings';
import Tests from '../components/Tests';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function EgzaminRoute(): ReactElement {
  return (
    <>
      <PrivateRoute exact path="/egzamin" component={Home} />
      <PrivateRoute exact path="/egzamin/addquest" component={AddQuest} />
      <PrivateRoute exact path="/egzamin/group" component={Group} />
      <PrivateRoute exact path="/egzamin/maketest" component={MakeTest} />
      <PrivateRoute exact path="/egzamin/settings" component={Settings} />
      <PrivateRoute exact path="/egzamin/tests" component={Tests} />
      <Redirect to="/egzamin" />
    </>
  );
}

function MainRoute(): ReactElement {
  return (
    <Switch>
      <PrivateRoute path="/egzamin" component={EgzaminRoute} />
      <PublicRoute path="/auth" component={AuthRoute} />
      <Redirect to="/auth" />
    </Switch>
  );
}

export default MainRoute;
