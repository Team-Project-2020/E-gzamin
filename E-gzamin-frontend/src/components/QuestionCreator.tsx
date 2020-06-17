import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, ReactElement } from "react";
import { sortBy } from "lodash";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionType } from "../types";
import CategoryFilter from "./CategoryFilter";
import { courses, questions, categories } from "../Constants";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
    margin: "20px",
    height: "80%",
    minWidth: "40%",
    maxWidth: "65%",
  },
  questionInput: {
    width: "100%",
    margin: "10px 0px",
  },
  answers: {
    display: "flex",
    flexDirection: "column",
  },
  addButton: {
    margin: "20px 0px",
  },
  answerRow: {
    margin: "5px 0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answerRowAnswer: {
    width: "60%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

type QuestionCreatorType = {
  editedQuestion: QuestionType | undefined;
};
const QuestionCreator = ({
  editedQuestion,
}: QuestionCreatorType): ReactElement => {
  const styles = useStyles();
  const [question, setQuestion] = useState<string>(
    editedQuestion?.question || ""
  );
  const [answers, setAnswers] = useState<Array<AnswerStateType>>(
    editedQuestion?.answers || []
  );
  const updateAnswer = (id: number) => (answer: AnswerType): void =>
    setAnswers(
      sortBy(
        [...answers.filter((ans) => ans.id !== id), { ...answer, id }],
        (a) => a.id
      )
    );
  const addAnswer = (): void => {
    const newAnswers = [
      ...answers,
      {
        text: "",
        isCorrect: false,
        id: answers[answers?.length - 1]?.id + 1 || 0,
      },
    ];
    setAnswers(newAnswers);
  };
  const onRemoveAnswer = (id: number) => () => {
    setAnswers(answers.filter((ans) => ans.id !== id));
  };
  const onSubmit = () => {};
  return (
    <Paper elevation={2} className={styles.paper}>
      <CategoryFilter
        categories={categories}
        onCategoryClick={(c) => () => {}}
      />

      <TextField
        className={styles.questionInput}
        id="standard-basic"
        value={question}
        onChange={({ target }): void => setQuestion(target.value)}
        label="Question"
      />
      <div className={styles.answers}>
        {answers.map(({ text, isCorrect, id }) => (
          <_AnswerRow
            text={text}
            isCorrect={isCorrect}
            key={id}
            updateAnswer={updateAnswer(id)}
            onRemoveAnswer={onRemoveAnswer(id)}
            styles={styles}
          />
        ))}
      </div>
      <div className={styles.buttons}>
        <Button
          onClick={addAnswer}
          className={styles.addButton}
          variant="contained"
          color="primary"
        >
          ADD ANSWER
        </Button>
        <Button
          onClick={onSubmit}
          className={styles.addButton}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </Paper>
  );
};
type AnswerStateType = {
  id: number;
  text: string;
  isCorrect: boolean;
};
type AnswerType = {
  text: string;
  isCorrect: boolean;
};
type _AnswerRowType = {
  text: string;
  isCorrect: boolean;
  updateAnswer: (answer: AnswerType) => void;
  styles: Record<
    "paper" | "questionInput" | "answers" | "answerRow" | "answerRowAnswer",
    string
  >;
  onRemoveAnswer: () => void;
};

const _AnswerRow = ({
  text,
  isCorrect,
  updateAnswer,
  styles,
  onRemoveAnswer,
}: _AnswerRowType): ReactElement => {
  return (
    <div className={styles.answerRow}>
      <TextField
        id="standard-basic"
        className={styles.answerRowAnswer}
        autoFocus
        onChange={(e): void => {
          updateAnswer({ text: e.target.value, isCorrect });
        }}
        label="Answer"
        value={text}
      />
      <FormControlLabel
        label="is correct"
        labelPlacement="start"
        control={
          <Checkbox
            checked={isCorrect}
            onChange={(): void => updateAnswer({ text, isCorrect: !isCorrect })}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
      />
      <IconButton aria-label="delete" color="primary" onClick={onRemoveAnswer}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default QuestionCreator;
