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
import { useHistory } from "react-router-dom";

type TestProps = {
  testId: string | undefined;
};

const Test = (props) => {
  const { params } = props.match;
  const designateId = parseInt(params.id);
  const history = useHistory();
  const {
    status,
    progress,
    toggleResult,
    isChecked,
    questions,
    results,
    setProgress,
    updateTestResult,
    testResult,
  } = useTest(designateId);

  if (!status.isReady()) return <Loader />;

  const onSubmit = async () => {
    console.log(testResult);

    const testResultQuestions: Array<{
      questionId: number;
      answers: Array<number>;
    }> = results.map((q) => ({
      questionId: q.id,
      answers: q.answers,
    }));
    await updateTestResult({
      testResultId: testResult.id,
      designateId,
      questions: testResultQuestions,
    });
    history.replace(`/egzamin`);
  };

  const actualQuestion = questions[progress];
  const isButtonDisabled = !results.every((r) => r.answers.length);
  console.log(results);
  return (
    <Grid style={{ margin: "auto", width: "80%" }} container direction="column">
      <LinearProgressWithLabel
        color={"secondary"}
        value={(progress * 100) / (questions.length - 1 || 1)}
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
          onClick={onSubmit}
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
