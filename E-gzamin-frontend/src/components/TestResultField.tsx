import React from "react";

import "./Home.scss";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TestIcon from "./TestIcon";
import TestFieldCell from "./TestFieldCell";
import { TestResultType } from "../types";
import formatDate from "../lib/formatDate";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

type TestResultFieldType = {
    testResult: TestResultType;
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

function TestResultField(props: TestResultFieldType) {
    const styles = useStyles();
    const { testResult } = props;
    const { id,
        result,
        maxPoints,
        isPassed,
        startedAt,
        finishedAt, } = testResult;
    const history = useHistory();
    const field = (
        <Paper className={styles.mainContent} elevation={2}>
            <Grid container item xs={12} spacing={0}>
                {isPassed ? <TestIcon status={"passed"} /> : <TestIcon status={"failed"} />}
                <TestFieldCell label="Result" value={`${result} points out of ${maxPoints} points`} />
                <TestFieldCell label="Started at" value={formatDate(startedAt)} />
                <TestFieldCell label="Finished at" value={formatDate(finishedAt)} />
            </Grid>
        </Paper>
    );

    return field;
}

export default TestResultField;
