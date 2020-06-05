import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

type Question = {
  id: number;
  question: string;
};
type QuestionsTableType = {
  questions: Array<Question>;
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
  },
  search: {
    width: "100%",
  },
}));

const QuestionsTable = ({ questions }: QuestionsTableType) => {
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
        {questions.map(({ question }) => {
          return (
            <Box
              className={styles.question}
              component="span"
              m={1}
              onClick={() => console.log("question click")}
            >
              {question}
            </Box>
          );
        })}
      </div>
    </Paper>
  );
};

export default QuestionsTable;
