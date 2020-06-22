import React from "react";
import "./Home.scss";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";

import useTestTemplate from "../hooks/useTestTemplate";
import TestField from "./TestField";
import TestTemplateField from "./TestTemplateField";
import useDesignates from "../hooks/useDesignates";
import DesignateField from "./DesignateField";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
  mainHeaders: {
    color: theme.palette.text.primary,
  },
  testIcon: {
    fill: theme.palette.text.primary,
  },
  root: {
    flexGrow: 1,
  },
}));

function Home() {
  const styles = useStyles();
  const { testTemplates } = useTestTemplate();
  const { ownedDesignates, designates } = useDesignates();

  return (
    <div className="Home-content">
      <Header content="TEST TEMPLATES" variant="h3" />
      {testTemplates.map((testTemplate, index) => (
        <TestTemplateField testTemplate={testTemplate} key={index} />
      ))}
      <Header content="DESIGNATED" variant="h3" />
      {ownedDesignates.map((designate, index) => (
        <DesignateField key={index} designate={designate} />
      ))}
      <Header content="TODO" variant="h3" />
      {/*designated not owned */}
      <TestField
        subject="Pszyrka"
        owner="Janusz"
        pub_date="21.37.1410"
        result="123/1500"
        result_positive={false}
        attempts={3}
        available_attempts={3}
        deadline="29.02.2021"
        time={20}
      />
      <Header content="COMPLETED" variant="h3" />
      {/*test results not owned */}
      <TestField
        subject="Demonologia"
        owner="Seweryn"
        pub_date="11.12.1499"
        result="123/134"
        result_positive
        attempts={2}
        available_attempts={3}
        deadline="30.02.2021"
        time={15}
      />
    </div>
  );
}

export default Home;
