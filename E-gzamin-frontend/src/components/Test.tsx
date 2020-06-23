import React, { useState } from "react";
import useTestResult from "../hooks/useTestResult";
import Loader from "./Loader";
import Paper from "@material-ui/core/Paper";
import TestQuestion from "./TestQuestion";
import useTest from "../hooks/useTest";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

type TestProps = {
  testId: string | undefined;
};

const Test = (props) => {
  const { params } = props.match;
  const id = parseInt(params.id);
  const {
    status,
    progress,
    toggleResult,
    isChecked,
    questions,
    results,
    setProgress,
  } = useTest(id);

  if (!status.isReady()) return <Loader />;

  const actualQuestion = questions[progress];
  const isButtonDisabled = !results.every((r) => r.answers.length);
  console.log(results);
  return (
    <Grid style={{ margin: "auto", width: "80%" }} container direction="column">
      <LinearProgressWithLabel
        color={"secondary"}
        value={(progress * 100) / (questions.length - 1)}
      />

      <TestQuestion
        isChecked={isChecked(actualQuestion.id)}
        toggleResult={toggleResult(actualQuestion.id)}
        question={actualQuestion}
      />
      <Grid
        style={{ margin: "auto", marginTop: "15px" }}
        container
        direction="row"
      >
        <Pagination
          style={{ marginLeft: "auto", marginRight: "auto" }}
          count={questions.length}
          color="secondary"
          page={progress + 1}
          onChange={(_, page) => setProgress(page - 1)}
        />
        <Button
          style={{ marginLeft: "auto", marginRight: "auto" }}
          onClick={() => {}}
          variant="contained"
          disabled={isButtonDisabled}
          color="secondary"
        >
          Finish the test
        </Button>
      </Grid>
    </Grid>
  );
};

export default Test;
