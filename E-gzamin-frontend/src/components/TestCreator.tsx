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
  selectedQuestions: Array<QuestionType | undefined>;
  onDelete: (question: QuestionType) => void;
  onGenerateTestClick: () => void;
};

const TestCreator = ({
  selectedQuestions,
  onDelete,
  onGenerateTestClick,
}: TestCreatorPropsType): ReactElement => {
  const styles = useStyles();
  const [testName, setTestName] = useState<string>("");
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
          <_QuestionContent
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

type _QuestionContentrPropsType = {
  answers: Array<AnswerType>;
  question: string;
  onDelete: () => void;
  styles: Record<
    | "paper"
    | "testName"
    | "QuestionContent"
    | "QuestionContentLeft"
    | "QuestionContentRight",
    string
  >;
};

const _QuestionContent = ({
  answers,
  question,
  onDelete,
  styles,
}: _QuestionContentrPropsType): ReactElement => {
  const getLetter = (value: number): string => String.fromCharCode(97 + value);

  return (
    <div className={styles.QuestionContent}>
      <div className={styles.QuestionContentLeft}>
        <Typography variant="subtitle1">{question}</Typography>
        {answers.map((answer, index) => (
          <Typography key={index} variant="subtitle2">
            {getLetter(index)}: {answer.content}
          </Typography>
        ))}
      </div>
      <div className={styles.QuestionContentRight}>
        <IconButton aria-label="delete" color="primary" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default TestCreator;
