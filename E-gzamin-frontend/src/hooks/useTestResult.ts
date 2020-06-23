import { useQuery, useMutation } from 'react-query';
import React, { useState, useEffect } from 'react';

import createTestResultAction from '../actions/createTestResult';
import getTestResultAction from '../actions/getTestResult';
import getTestResultTemplateAction from '../actions/getTestResultTemplate';
import getTestResultTemplateQuestionsAction from '../actions/getTestResultTemplateQuestions';
import getTestResultTemplateQuestionAnswersAction from '../actions/getTestResultTemplateQuestionAnswers';

const useTestResult = id => {
  const [results, setResults] = useState([]);

  const { data, isFetching, refetch, status } = useQuery<any, any, Error>(
    `getTestResult${id}`,
    async () => {
      const testResultAction = await getTestResultAction({ testResultId: id });
      console.log(testResultAction)
      const templates = await getTestResultTemplateAction({
        testResultId: id,
      });
      const template = templates[0];
      const questions = await getTestResultTemplateQuestionsAction({
        testResultId: id,
        testTemplateId: template.id,
      });
      const answers = await Promise.all<Array<{ question: string }>>(
        questions.map(
          async q =>
            await getTestResultTemplateQuestionAnswersAction({
              testResultId: id,
              testTemplateId: template.id,
              questionId: q.id,
            }),
        ),
      );
      const answersWithQuestions = questions.map(quest => ({
        ...quest,
        answers: answers.find(answersPerQuestion =>
          answersPerQuestion.every(answer => answer.question === quest.id),
        ),
      }));
      setResults(answersWithQuestions.map(q => ({ ...q, answers: [] })));
      return answersWithQuestions;
    },
    {
      manual: true,
    },
  );

  const [
    createTestResult,
    { status: createStatus, data: createdTestResult },
  ] = useMutation<any, { designateId: number }, Error>(createTestResultAction);

  const isIdle = () => createStatus === 'idle';
  const isLoading = () => createStatus === 'loading';
  if (isIdle() && !createdTestResult) {
    createTestResult({ designateId: id });
  }
  if (data === undefined && !isFetching) refetch();
  return {
    createStatus: { isIdle, isLoading },
    createdTestResult,
    questions: data || [],
    testResultStatus: status,
    results,
    setResults,
  };
};

export default useTestResult;
