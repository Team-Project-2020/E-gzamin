import React, { useEffect } from "react";
import "./Home.scss";
import Header from "./Header";
import { makeStyles } from "@material-ui/core/styles";

import useTestTemplate from "../hooks/useTestTemplate";
import TestField from "./TestField";
import TestTemplateField from "./TestTemplateField";
import useDesignates from "../hooks/useDesignates";
import DesignateField from "./DesignateField";
import useTestResults from "../hooks/useTestResults";
import TestResultField from "./TestResultField";

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
  const { testTemplates, refetch: refetchTestTemplates } = useTestTemplate();
  const {
    ownedDesignates,
    designates,
    refetchAll: refetchAllDesignates,
  } = useDesignates();
  const { testResults, refetch: refetchTestResults } = useTestResults();

  useEffect(() => {
    refetchAllDesignates();
    refetchTestResults();
    refetchTestTemplates();
  }, []);

  return (
    <div className="Home-content">
      {testTemplates.length > 0 && (
        <Header content="TEST TEMPLATES" variant="h3" />
      )}
      {testTemplates.map((testTemplate, index) => (
        <TestTemplateField testTemplate={testTemplate} key={index} />
      ))}
      {ownedDesignates.length > 0 && (
        <Header content="DESIGNATED" variant="h3" />
      )}
      {ownedDesignates.map((designate, index) => (
        <DesignateField key={index} designate={designate} />
      ))}
      {designates.length > 0 && <Header content="TODO" variant="h3" />}
      {designates.map((designate, index) => (
        <TestField key={index} designate={designate} />
      ))}
      {testResults.length > 0 && <Header content="COMPLETED" variant="h3" />}
      {testResults.map((testResult, index) => (
        <TestResultField key={index} testResult={testResult} />
      ))}
      {testTemplates.length === 0 &&
        ownedDesignates.length === 0 &&
        designates.length === 0 &&
        testResults.length === 0 && <Header content="No tests" variant="h3" />}
    </div>
  );
}

export default Home;
