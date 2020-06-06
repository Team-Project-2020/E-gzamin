import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import QuestionsTable from "./QuestionsTable";
import CategoryFilter from "./CategoryFilter";
import QuestionCreator from "./QuestionCreator";
import CourseSelect from "./CourseSelect";
import { QuestionType, CourseType } from "../types";
import { courses, questions, categories } from "../Constants";
const useStyles = makeStyles((theme) => ({
  addQuest: {
    width: "inherit",
    backgroundColor: theme.palette.background.default,
  },
  questionDetails: {
    display: "flex",
    flexDirection: "row",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courseSelect: {
    minWidth: "250px",
    margin: "20px",
  },
  courseSelectSelect: {
    width: "100%",
  },
}));

function AddQuest() {
  const styles = useStyles();
  const [selectedQuestion, setSelectedQuestion] = useState<
    QuestionType | undefined
  >(undefined);

  return (
    <div className={styles.addQuest}>
      <div className={styles.header}>
        <CategoryFilter
          categories={categories}
          onCategoryClick={(c) => () => {}}
        />
        <CourseSelect courses={courses} />
      </div>
      <div className={styles.questionDetails}>
        <QuestionsTable
          questions={questions}
          selected={selectedQuestion}
          onSelect={(question: QuestionType): void =>
            setSelectedQuestion(question)
          }
        />
        <QuestionCreator editedQuestion={selectedQuestion} />
      </div>
    </div>
  );
}

type CourseSelectType = {
  styles: Record<string | number | symbol, string>;
  courses: Array<CourseType>;
};

export default AddQuest;
