import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import TestIcon from "./TestIcon";
import Button from "@material-ui/core/Button";
import MakeTestPopup from "./MakeTestPopup";
import { DesignateType } from "../types";

import TestFieldCell from "./TestFieldCell";
import useGroups from "../hooks/useGroups";
import useTestTemplate from "../hooks/useTestTemplate";
import formatDate from '../lib/formatDate';

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "80%",
    marginLeft: "5%",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginBottom: "20px",
    marginTop: "20px",
  },
  mainHeaders: {
    color: theme.palette.text.primary,
  },
  testIcon: {
    fill: theme.palette.text.primary,
  },
  button: {
    margin: "auto",
  },
  root: {
    flexGrow: 1,
  },
}));

type DesignateFieldProps = {
  designate: DesignateType;
};


const DesignateField = ({ designate }: DesignateFieldProps) => {
  const styles = useStyles();
  const {
    time,
    startDate,
    endDate,
    passReq,
    testTemplate_id,
    group_id,
  } = designate;
  const group = useGroups().getGroup(group_id);
  const testTemplate = useTestTemplate().getTestTemplate(testTemplate_id);
  //TODO: show test template questions and group members
  return (
    <Paper className={styles.mainContent} elevation={2}>
      <Grid container direction="row">
        <TestIcon />
        <TestFieldCell label="Time for test" value={`${time} minutes`} />
        <TestFieldCell label="start date" value={formatDate(startDate)} />
        <TestFieldCell label="end date" value={formatDate(endDate)} />
        <TestFieldCell
          label="required"
          value={`${parseFloat(passReq) * 100}%`}
        />
        <TestFieldCell label="group name" value={group?.name} />
        <TestFieldCell label="group members" value={group?.members.length} />
        <TestFieldCell label="template" value={testTemplate?.name} />
      </Grid>
    </Paper>
  );
};

export default DesignateField;
