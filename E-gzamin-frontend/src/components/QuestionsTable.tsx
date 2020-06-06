import React, { useState, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { QuestionType } from "../types";
import classnames from "classnames";

type QuestionsTableType = {
  questions: Array<QuestionType>;
  selected: QuestionType | undefined;
  onSelect: (question: QuestionType) => void;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    margin: "20px",
    height: "80%",
    maxWidth: "30%",
  },
  questions: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    height: "90%",
  },
  question: {
    cursor: "pointer",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.text.primary,
    },
    "&.isSelected": {
      color: theme.palette.text.primary,
    },
  },
  search: {
    width: "100%",
  },
}));

const QuestionsTable = ({
  questions,
  selected,
  onSelect,
}: QuestionsTableType): ReactElement => {
  const styles = useStyles();

  return (
    <Paper elevation={2} className={styles.paper}>
      <TextField
        className={styles.search}
        id="filled-basic"
        label="Filled"
        variant="filled"
      />
      <div className={styles.questions}>
        {questions.map((question) => {
          return (
            <Box
              className={classnames(styles.question, {
                isSelected: selected?.id === question.id,
              })}
              component="span"
              m={1}
              key={question.id}
              onClick={(): void => onSelect(question)}
            >
              {question.question}
            </Box>
          );
        })}
      </div>
    </Paper>
  );
};

export default QuestionsTable;