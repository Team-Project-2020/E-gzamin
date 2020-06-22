import React from "react";

import "./Home.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TestIcon from "./TestIcon";
import TestFieldCell from "./TestFieldCell";

type TestFieldType = {
  subject: string;
  owner: string;
  pub_date: string;
  result: string;
  result_positive: boolean;
  attempts: number;
  available_attempts: number;
  deadline: string;
  time: number;
};

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "80%",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginLeft:'5%',
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

function TestField(props: TestFieldType) {
  const styles = useStyles();
  const {
    subject,
    owner,
    pub_date,
    result,
    result_positive,
    attempts,
    available_attempts,
    deadline,
    time,
  } = props;
  const testIconStatus =
    available_attempts == attempts
      ? "todo"
      : result_positive
      ? "passed"
      : "failed";

  const field = (
    <Paper className={styles.mainContent} elevation={2}>
      <Grid container item xs={12} spacing={0}>
        <Grid container item xs={1} spacing={0}>
          <TestIcon status={testIconStatus} />
        </Grid>
        <Grid container item xs={2} spacing={0}>
          <TestFieldCell label="Subject" value={subject} />
        </Grid>
        <Grid container item xs={2} spacing={0}>
          <TestFieldCell label="Author" value={owner} />
        </Grid>
        <Grid container item xs={1} spacing={0}>
          <TestFieldCell label="Publicated" value={pub_date} />
        </Grid>
        <Grid container item xs={1} spacing={0}>
          <TestFieldCell label="Deadline" value={deadline} />
        </Grid>
        <Grid container item xs={1} spacing={0}>
          <TestFieldCell label="Score" value={result} />
        </Grid>
        <Grid container item xs={1} spacing={0}>
          <TestFieldCell
            label="Result"
            value={result_positive ? "Passed" : "Failed"}
          />
        </Grid>
        <Grid container item xs={1} spacing={0}>
          <TestFieldCell
            label="Attempts"
            value={attempts + "/" + available_attempts}
          />
        </Grid>
        <Grid container item xs={1} spacing={0}>
          <TestFieldCell label="Time" value={time + " min"} />
        </Grid>
      </Grid>
    </Paper>
  );

  return field;
}

export default TestField;
