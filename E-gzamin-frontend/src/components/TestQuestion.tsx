import React, { useState } from "react";
import useTestResult from "../hooks/useTestResult";
import Loader from "./Loader";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Header from "./Header";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    width: "80%",
    height: "400px",
    margin: "auto",
    // backgroundColor: theme.palette.background.default,
  },
}));

type TestQuestion = {
  question: {
    content: string;
    answers: Array<{ content: string; id: number }>;
  };
  isChecked: (answerId: number) => boolean;
  toggleResult: (answerId: number) => void;
};

const TestQuestion = ({ question, isChecked, toggleResult }) => {
  const styles = useStyles();
  const { content, answers } = question;
  return (
    <Paper className={styles.mainContent}>
      <Header content={content} variant="h5" />
      {answers.map((answer, index) => (
        <_Answer
          isChecked={isChecked(answer.id)}
          toggleAnswer={() => toggleResult(answer.id)}
          key={index}
          content={answer.content}
        />
      ))}
    </Paper>
  );
};

type _Answer = {
  isChecked: boolean;
  toggleAnswer: () => void;
  content: string;
};

const _Answer = ({ isChecked, toggleAnswer, content }: _Answer) => {
  return (
    <>
      <Checkbox
        checked={isChecked}
        onChange={toggleAnswer}
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      {content}
    </>
  );
};

export default TestQuestion;
