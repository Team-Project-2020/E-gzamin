import React from "react";
import "./Home.scss";
import Header from "./Header";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import HighlightOffTwoToneIcon from "@material-ui/icons/HighlightOffTwoTone";
import HelpOutlineTwoToneIcon from "@material-ui/icons/HelpOutlineTwoTone";
import Grid from "@material-ui/core/Grid";
import TestIcon from "../pictures/TestIcon";
import Paper from "@material-ui/core/Paper";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useTestTemplate from "../hooks/useTestTemplate";

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

type StatusPicType = {
  status: string;
};

function StatusIcon(props: StatusPicType) {
  const status = props.status;
  if (status === "todo") {
    return <HelpOutlineTwoToneIcon style={{ color: "yellow" }} />;
  }
  if (status === "failed") {
    return <HighlightOffTwoToneIcon style={{ color: "#ff4545" }} />;
  }
  if (status === "passed") {
    return <CheckCircleIcon style={{ color: "lightgreen" }} />;
  }
  return null;
}

type TestIconType = {
  status?: "todo" | "failed" | "passed";
};

function TestIconComponent(props: TestIconType) {
  const status = props.status;
  const styles = useStyles();

  return (
    <div className="test-icon">
      <TestIcon className={styles.testIcon} />
      {status && <StatusIcon status={status} />}
    </div>
  );
}

export default TestIconComponent;
