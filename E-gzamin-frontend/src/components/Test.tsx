import React, { useState } from "react";
import useTestResult from "../hooks/useTestResult";
import Loader from "./Loader";
import Paper from "@material-ui/core/Paper";
import TestQuestion from "./TestQuestion";
import useTest from "../hooks/useTest";

type TestProps = {
  testId: string | undefined;
};

const Test = (props) => {
  const { params } = props.match;
  const id = parseInt(params.id);
  // const { status, progress, testResult, toggleResult, isChecked } = useTest(id);
  const {
    createTestResult,
    createStatus,
    createdTestResult,
    data,
  } = useTestResult(id);
  const designateId = id;
  console.log(data)

  if (true) return <Loader />;

  // const questions = [
  //   {
  //     id: 3,
  //     content: "a",
  //     answers: [
  //       { id: 734, content: "1" },
  //       { id: 54, content: "2" },
  //       { id: 423, content: "3" },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     content: "b",
  //     answers: [
  //       { id: 1, content: "1" },
  //       { id: 2, content: "2" },
  //       { id: 3, content: "3" },
  //     ],
  //   },
  //   {
  //     id: 5,
  //     content: "c",
  //     answers: [
  //       { id: 23, content: "1" },
  //       { id: 11, content: "2" },
  //       { id: 423, content: "3" },
  //     ],
  //   },
  // ];
  // const actualQuestion = questions[progress];
  // return (
  //   <TestQuestion
  //     isChecked={isChecked(actualQuestion.id)}
  //     toggleResult={toggleResult(actualQuestion.id)}
  //     question={actualQuestion}
  //   />
  // );
};

export default Test;
