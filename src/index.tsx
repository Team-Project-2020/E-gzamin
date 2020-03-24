import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./Home";
import AddQuest from "./AddQuest";
import Group from "./Group";
import MakeTest from "./MakeTest";
import Settings from "./Settings";
import Tests from "./Tests";
import * as serviceWorker from "./serviceWorker";
import { isAbsolute } from "path";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function RouterTest() {
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

ReactDOM.render(<RouterTest />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
