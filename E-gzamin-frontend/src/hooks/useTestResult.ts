import { useQuery, useMutation } from 'react-query';
import React, { useState, useEffect } from 'react';

import createTestResultAction from '../actions/createTestResult';
import getTestResultAction from '../actions/getTestResult';
import getTestResultTemplateAction from '../actions/getTestResultTemplate';
import getTestResultTemplateQuestionsAction from '../actions/getTestResultTemplateQuestions';
import getTestResultTemplateQuestionAnswersAction from '../actions/getTestResultTemplateQuestionAnswers';

const useTestResult = id => {
  const [results, setResults] = useState([]);

  const [createTestResult, { status, data, reset }] = useMutation<
    any,
    { designateId: number },
    Error
  >(async data => {
    const testResult = await createTestResultAction(data);
    console.log(testResult);
    const templates = await getTestResultTemplateAction({
      testResultId: testResult.id,
    });
    const template = templates[0];
    const questions = await getTestResultTemplateQuestionsAction({
      testResultId: testResult.id,
      testTemplateId: template.id,
    });
    const answers = await Promise.all<Array<{ question: string }>>(
      questions.map(
        async q =>
          await getTestResultTemplateQuestionAnswersAction({
            testResultId: testResult.id,
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
    console.log(answersWithQuestions);
    setResults(answersWithQuestions.map(q => ({ ...q, answers: [] })));
    return { questions: answersWithQuestions, testResult };
  });
  useEffect(() => {
    reset();
  }, []);
  const isIdle = () => status === 'idle';
  const isLoading = () => status === 'loading';
  if (isIdle() && !data) {
    createTestResult({ designateId: id });
  }

  return {
    createStatus: { isIdle, isLoading },
    questions: data?.questions || [],
    testResultStatus: status,
    results,
    createdTestResult: data?.testResult || {},
    setResults,
  };
};

export default useTestResult;
