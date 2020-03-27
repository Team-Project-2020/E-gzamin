import React, { useState } from "react";
import MainRoute from "./components/MainRoute";
import SimpleAppBar from "./components/SimpleAppBar";
import SimpleDrawer from "./components/SimpleDrawer";

import "./App.scss";

const App = () => {
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(true);
  return (
    <div className="App">
      <SimpleAppBar
        isDrawerOpened={isDrawerOpened}
        setIsDrawerOpened={setIsDrawerOpened}
      />
      <SimpleDrawer
        isDrawerOpened={isDrawerOpened}
        setIsDrawerOpened={setIsDrawerOpened}
      />
      <_Content />
    </div>
  );
};

const _Content = () => (
  <div className="_Content">
    <div />
    <MainRoute />
  </div>
);

export default App;
