import React, { useState, ReactElement } from "react";
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
    marginTop: "0px",
    marginLeft: "0px",
    marginRight: "0px",
    marginBottom: "20px",
  },
  courseSelectSelect: {
    width: "100%",
  },
}));

function AddQuest(): ReactElement {
  const styles = useStyles();
  const [selectedQuestion, setSelectedQuestion] = useState<
    QuestionType | undefined
  >(undefined);

  return (
    <div className={styles.addQuest}>
      <div className={styles.header}></div>
      <div className={styles.questionDetails}>
        <QuestionsTable
          header={<CourseSelect styles={styles} courses={courses} />}
          questions={questions}
          selectedQuestions={[selectedQuestion]}
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
