import React, { useState, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import QuestionsTable from "./QuestionsTable";
import CourseSelect from "./CourseSelect";
import CategoryFilter from "./CategoryFilter";
import TestCreator from "./TestCreator";
import { QuestionType } from "../types";
import MakeTestPopup from "./MakeTestPopup";
import useQuestions from "../hooks/useQuestions";
import { CourseType } from "../types";
import useCategories from "../hooks/useCategories";
import useTestTemplate from "../hooks/useTestTemplate";

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

  courseSelect: {
    minWidth: "250px",
    marginTop: "0px",
    marginLeft: "0px",
    marginRight: "0px",
    marginBottom: "20px",
  },
  courseSelectSelect: {
    width: "100%",
  },
}));

function MakeTest(): ReactElement {
  const styles = useStyles();
  const { categories: courses } = useCategories();
  const [testName, setTestName] = useState<string>("");

  const { testTemplates, createTestTemplate } = useTestTemplate();

  const [selectedQuestions, setSelectedQuestions] = useState<
    Array<QuestionType>
  >([]);

  const { questions } = useQuestions();
  const [selectedCourse, setCourse] = useState<undefined | CourseType>(
    undefined
  );

  const onTestCreate = async () => {
    const questions = selectedQuestions.map(({ id }) => id);
    await createTestTemplate({ name: testName, questions });
    setTestName("");
    setSelectedQuestions([]);
  };

  const updateSelectedQuestions = (question: QuestionType): void => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q?.id !== question.id)
      );
    } else {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };
  const filteredQuestions = !!selectedCourse
    ? questions.filter((q) => q?.courses.includes(selectedCourse?.id))
    : questions;

  return (
    <div className={styles.makeTest}>
      <div className={styles.header}></div>
      <div className={styles.test}>
        <QuestionsTable
          header={
            <CourseSelect
              value={selectedCourse}
              onChange={setCourse}
              styles={styles}
              courses={courses}
            />
          }
          questions={filteredQuestions}
          selectedQuestions={selectedQuestions}
          onSelect={updateSelectedQuestions}
        />
        <TestCreator
          onDelete={updateSelectedQuestions}
          onGenerateTestClick={onTestCreate}
          selectedQuestions={selectedQuestions}
          setTestName={setTestName}
          testName={testName}
        />
      </div>
    </div>
  );
}

export default MakeTest;
