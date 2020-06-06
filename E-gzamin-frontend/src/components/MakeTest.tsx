import React, { useState, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import { courses, questions, categories } from "../Constants";
import QuestionsTable from "./QuestionsTable";
import CourseSelect from "./CourseSelect";
import CategoryFilter from "./CategoryFilter";
import TestCreator from "./TestCreator";
import { QuestionType } from "../types";
import MakeTestPopup from "./MakeTestPopup";

const useStyles = makeStyles((theme) => ({
  makeTest: {
    width: "inherit",
    backgroundColor: theme.palette.background.default,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  test: {
    display: "flex",
    flexDirection: "row",
  },
  generateTestButton: {
    margin: "20px",
  },
}));

function MakeTest() {
  const styles = useStyles();
  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<QuestionType>
  >([]);
  const [isMakeTestPopupOpened, setMakeTestPopupOpened] = useState<boolean>(
    false
  );
  const togglePopup = () => setMakeTestPopupOpened(!isMakeTestPopupOpened);
  const updateSelectedQuestions = (question: QuestionType) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q?.id !== question.id)
      );
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  return (
    <div className={styles.makeTest}>
      <div className={styles.header}>
        <CategoryFilter
          categories={categories}
          onCategoryClick={(c) => (): void => {}}
        />
        <div>
          <CourseSelect courses={courses} />
          <Button
            onClick={togglePopup}
            className={styles.generateTestButton}
            variant="contained"
            color="primary"
          >
            GENERATE TEST
          </Button>
        </div>
      </div>
      <div className={styles.test}>
        <QuestionsTable
          questions={questions}
          selectedQuestions={selectedQuestions}
          onSelect={updateSelectedQuestions}
        />
        <TestCreator
          selectedQuestions={selectedQuestions}
          onDelete={updateSelectedQuestions}
        />
      </div>
      <MakeTestPopup
        test={{ questions: selectedQuestions }}
        open={isMakeTestPopupOpened}
        onClose={togglePopup}
      />
    </div>
  );
}

export default MakeTest;
