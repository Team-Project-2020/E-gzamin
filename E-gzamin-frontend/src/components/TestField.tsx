import React from "react";

import "./Home.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TestIcon from "./TestIcon";
import TestFieldCell from "./TestFieldCell";
import { DesignateType } from "../types";
import formatDate from "../lib/formatDate";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

type TestFieldType = {
  designate: DesignateType;
};

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "80%",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginLeft: "5%",
    marginBottom: "20px",
    marginTop: "20px",
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
  button: {
    margin: "auto",
  },
}));

function TestField(props: TestFieldType) {
  const styles = useStyles();
  const { designate } = props;
  const { time, startDate, endDate, passReq } = designate;
  const history = useHistory();
  const field = (
    <Paper className={styles.mainContent} elevation={2}>
      <Grid container item xs={12} spacing={0}>
        <TestIcon status={"todo"} />

        <TestFieldCell label="Time for test" value={`${time} minutes`} />
        <TestFieldCell label="Publicated" value={formatDate(startDate)} />
        <TestFieldCell label="Deadline" value={formatDate(endDate)} />
        <TestFieldCell
          label="required"
          value={`${parseFloat(passReq) * 100}%`}
        />
        <Button
          className={styles.button}
          onClick={() => history.replace(`/test/${designate.id}`)}
          variant="contained"
          color="primary"
        >
          USE Template
        </Button>
      </Grid>
    </Paper>
  );

  return field;
}

export default TestField;
