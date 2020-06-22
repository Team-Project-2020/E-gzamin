import React, { useState, ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { QuestionType, AnswerType } from "../types";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import QuestionContent from "./QuestionContent"

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: "20px",
    margin: "20px",
    height: "80%",
    minWidth: "40%",
    maxWidth: "65%",
  },
  testName: {
    width: "100%",
    margin: "10px 0px",
  },
  QuestionContent: {
    margin: "15px 0px",
    padding: "15px 0px",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  QuestionContentLeft: {},
  QuestionContentRight: {},
  generateTestButton: {
    margin: "20px",
  },
}));

type TestCreatorPropsType = {
  onDelete: (question: QuestionType) => void;
  onGenerateTestClick: () => void;
  selectedQuestions: Array<QuestionType | undefined>;
  setTestName: (name: string) => void;
  testName: string;
};

const TestCreator = ({
  selectedQuestions,
  onDelete,
  onGenerateTestClick,
  setTestName,
  testName,
}: TestCreatorPropsType): ReactElement => {
  const styles = useStyles();
  return (
    <Paper className={styles.paper}>
      <TextField
        className={styles.testName}
        id="standard-basic"
        value={testName}
        onChange={({ target }): void => setTestName(target.value)}
        label="Test name"
      />
      {selectedQuestions.map((question, index) => (
        <React.Fragment key={index}>
          <QuestionContent
            key={question.id}
            styles={styles}
            question={question.content}
            answers={question.answers || []}
            onDelete={(): void => onDelete(question)}
          />
        </React.Fragment>
      ))}
      <Button
        onClick={onGenerateTestClick}
        className={styles.generateTestButton}
        variant="contained"
        color="primary"
        disabled={!selectedQuestions || !selectedQuestions.length}
      >
        GENERATE TEST
      </Button>
    </Paper>
  );
};

export default TestCreator;
