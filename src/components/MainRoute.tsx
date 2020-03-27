import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AddQuest from "./AddQuest";
import Group from "./Group";
import Home from "./Home";
import MakeTest from "./MakeTest";
import Settings from "./Settings";
import Tests from "./Tests";

function MainRoute() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/addquest" component={AddQuest} />
        <Route exact path="/group" component={Group} />
        <Route exact path="/maketest" component={MakeTest} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/tests" component={Tests} />
        <Route component={Home} />
      </Switch>
    </Router>
  );
}

export default MainRoute;
