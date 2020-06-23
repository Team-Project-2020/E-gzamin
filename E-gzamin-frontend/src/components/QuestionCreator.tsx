import Box from "@material-ui/core/Box";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, ReactElement, useEffect } from "react";
import { sortBy } from "lodash";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { QuestionType, AnswerType } from "../types";
import CategoryFilter from "./CategoryFilter";
import { courses, questions, categories } from "../Constants";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  paper: {
    padding: "20px",
    margin: "20px",
    height: "80%",
    minWidth: "40%",
    maxWidth: "65%",
  },
  questionInput: {
    width: "85%",
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
  createQuestion: any;
  onQuestionRemove: () => void;
};
const QuestionCreator = ({
  editedQuestion,
  createQuestion,
  onQuestionRemove,
}: QuestionCreatorType): ReactElement => {
  const styles = useStyles();
  const [question, setQuestion] = useState<string | null>(
    editedQuestion?.content || ""
  );
  const [answers, setAnswers] = useState<Array<AnswerType>>(
    editedQuestion?.answers || []
  );
  const [selectedCourses, setSelectedCourses] = useState([]);
  const refreshState = () => {
    const newQuestion = editedQuestion?.content || "";
    const newAnswers = editedQuestion?.answers || [];
    setSelectedCourses(editedQuestion?.courses || []);
    setQuestion(newQuestion);
    setAnswers(newAnswers);
  }
  useEffect(() => {
    refreshState();
  }, [editedQuestion]);

  const updateAnswer = (id: number, createdAt: Date) => (
    answer: AnswerType
  ): void => {
    const updatedAnswer = answers.find((ans) => ans.createdAt === createdAt);
    setAnswers(
      sortBy(
        [
          ...answers.filter((ans) => ans.createdAt !== createdAt),
          { ...updatedAnswer, ...answer },
        ],
        (a) => a.createdAt.getTime()
      )
    );
  };
  const addAnswer = (): void => {
    const newAnswers = [
      ...answers,
      {
        content: "",
        isCorrect: false,
        createdAt: new Date(),
        question: editedQuestion?.id,
      },
    ];
    setAnswers(newAnswers);
  };
  const onRemoveAnswer = (createdAt: Date) => () => {
    setAnswers(
      answers.map((ans) => {
        if (ans.createdAt.getTime() === createdAt.getTime()) {
          return { ...ans, removedAt: new Date() };
        }
        return ans;
      })
    );
  };

  const onCategoryClick = (categoryId) => () => {
    if (selectedCourses.includes(categoryId))
      setSelectedCourses(selectedCourses.filter((c) => c !== categoryId));
    else setSelectedCourses([...selectedCourses, categoryId]);
  };

  const onSubmit = () => {
    createQuestion({
      question: { content: question, answers, courses: selectedCourses },
    });
    refreshState();
  };
  return (
    <Paper elevation={2} className={styles.paper}>
      <CategoryFilter
        selectedCategories={selectedCourses}
        onCategoryClick={onCategoryClick}
      />
      <Grid
        container
        item
        spacing={0}
        direction="row"
        alignItems="flex-end"
        justify="space-between"
      >
        <TextField
          className={styles.questionInput}
          id="standard-basic"
          value={question}
          autoFocus={true}
          onChange={({ target }): void => setQuestion(target.value)}
          label="Question"
        />
        <IconButton
          aria-label="delete"
          color="default"
          onClick={onQuestionRemove}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <div className={styles.answers}>
        {answers.map(({ content, isCorrect, id, createdAt, removedAt }) => (
          <_AnswerRow
            content={content}
            isCorrect={isCorrect}
            key={createdAt.getTime()}
            disabled={!!removedAt}
            createdAt={createdAt}
            updateAnswer={updateAnswer(id, createdAt)}
            onRemoveAnswer={onRemoveAnswer(createdAt)}
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

type _AnswerRowType = {
  content: string;
  isCorrect: boolean;
  updateAnswer: (answer: AnswerType) => void;
  createdAt: Date;
  disabled: boolean | undefined;
  styles: Record<
    "paper" | "questionInput" | "answers" | "answerRow" | "answerRowAnswer",
    string
  >;
  onRemoveAnswer: () => void;
};

const _AnswerRow = ({
  content,
  isCorrect,
  updateAnswer,
  styles,
  createdAt,
  onRemoveAnswer,
  disabled,
}: _AnswerRowType): ReactElement => {
  return (
    <div className={styles.answerRow}>
      <TextField
        id="standard-basic"
        className={styles.answerRowAnswer}
        autoFocus
        disabled={disabled}
        onChange={(e): void => {
          updateAnswer({ content: e.target.value, isCorrect, createdAt });
        }}
        label="Answer"
        value={content}
      />
      <FormControlLabel
        label="is correct"
        labelPlacement="start"
        control={
          <Checkbox
            checked={isCorrect}
            disabled={disabled}
            onChange={(): void =>
              updateAnswer({ content, isCorrect: !isCorrect, createdAt })
            }
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        }
      />
      <IconButton
        aria-label="delete"
        color="default"
        onClick={onRemoveAnswer}
        disabled={disabled}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default QuestionCreator;
