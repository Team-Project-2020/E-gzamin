import React, { useState, ReactElement, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import QuestionsTable from "./QuestionsTable";
import QuestionCreator from "./QuestionCreator";
import CourseSelect from "./CourseSelect";
import { QuestionType, CourseType } from "../types";
import useQuestions from "../hooks/useQuestions";
import useCategories from "../hooks/useCategories";

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
  const {
    questions,
    createQuestion,
    removeQuestion,
    updateQuestion,
  } = useQuestions();
  const { categories: courses } = useCategories();

  const [selectedCourse, setCourse] = useState<undefined | CourseType>(
    undefined
  );

  const onQuestionRemove = () => {
    selectedQuestion?.id && removeQuestion({ id: selectedQuestion.id });
    setSelectedQuestion(undefined);
  };

  const onQuestionSelect = (question: QuestionType) => {
    if (question.id === selectedQuestion?.id) setSelectedQuestion(undefined);
    else setSelectedQuestion(question);
  };

  const onCreateQuestions = async ({ question }) => {
    let newQuestion;
    if (selectedQuestion?.id) {
      newQuestion = await updateQuestion({
        id: selectedQuestion.id,
        question: {
          id: selectedQuestion.id,
          content: question.content,
          answers: question.answers,
          courses: selectedQuestion.courses,
        },
      });
    } else
      newQuestion = await createQuestion({
        content: question.content,
        answers: question.answers,
        courses: question.courses,
      });

    setSelectedQuestion(undefined);
  };

  const filteredQuestions = !!selectedCourse
    ? questions.filter((q) => q?.courses.includes(selectedCourse?.id))
    : questions;
    
  useEffect(() => {
    const question = questions.find((q) => q?.id === selectedQuestion?.id); //weird behaviour in case of answer delete
    question && setSelectedQuestion(question);
  }, [questions]);

  return (
    <div className={styles.addQuest}>
      <div className={styles.header}></div>
      <div className={styles.questionDetails}>
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
          selectedQuestions={[selectedQuestion]}
          onSelect={onQuestionSelect}
        />
        <QuestionCreator
          editedQuestion={selectedQuestion}
          createQuestion={onCreateQuestions}
          onQuestionRemove={onQuestionRemove}
        />
      </div>
    </div>
  );
}

type CourseSelectType = {
  styles: Record<string | number | symbol, string>;
  courses: Array<CourseType>;
};

export default AddQuest;
