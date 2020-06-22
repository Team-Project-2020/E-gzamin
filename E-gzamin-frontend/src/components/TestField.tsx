import React from "react";

import "./Home.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TestIcon from './TestIcon';

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

  const field = (
    <div className={`styles.mainContent, paper`}>
      <Paper elevation={2}>
        <div className={"flex-container, styles.root"}>
          <Grid container item xs={12} spacing={0}>
            <Grid container item xs={1} spacing={0}>
              <TestIcon
                status={
                  available_attempts == attempts
                    ? "todo"
                    : result_positive
                    ? "passed"
                    : "failed"
                }
              />
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
        </div>
      </Paper>
    </div>
  );

  return field;
}

type TestFieldCellType = {
  label: string;
  value: string | boolean | number;
};

function TestFieldCell(props: TestFieldCellType) {
  const label = props.label;
  const value = props.value;

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "1.3em" }}>
      <p>{label + ":"}</p>
      <p>{value}</p>
    </div>
  );
}



export default TestField;
