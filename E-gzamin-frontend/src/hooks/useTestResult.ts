import { useQuery, useMutation } from 'react-query';

import createTestResultAction from '../actions/createTestResult';
import getTestResultAction from '../actions/getTestResult';
import getTestResultTemplateAction from '../actions/getTestResultTemplate';
import getTestResultTemplateQuestionsAction from '../actions/getTestResultTemplateQuestions';
import getTestResultTemplateQuestionAnswersAction from '../actions/getTestResultTemplateQuestionAnswers';
import { useDebugValue } from 'react';

const useTestResult = id => {
  const { data, isFetching, refetch } = useQuery<any, any, Error>(
    'getTestResult',
    async (id) => { 
      const testResultAction = await getTestResultAction({testResultId: id});
      console.log(testResultAction)
      const template = await getTestResultTemplateAction({testResultId: id});
      const questions = await getTestResultTemplateQuestionsAction({testResultId: id, testTemplateId: template.id});
      const answers = await Promise.all(
        questions.map(
          async (q) => await getTestResultTemplateQuestionAnswersAction(
            { testResultId: id, testTemplateId: template.id, questionId: q.id })))
    return {testResultAction,
       testResultTemplate: template,
       testResultTemplateQuestions: questions,
       testResultTemplateQuestionAnswers: answers}},
    {
      manual: true,
    },
  );
  // const { data: testTemplate, 
  //   isFetching: isFetchingTemplate, 
  //   refetch: refetchTemplate } = useQuery<any, any, Error>(
  //   'getTestResultTemplate',
  //   getTestResultTemplateAction,
  //   {
  //     manual: true,
  //   },
  // );
  // const {data: testTemplateQuestions, 
  //   isFetching: isFetchingTemplateQuestions, 
  //   refetch: refetchTemplateQuestions} = useQuery<any, any, Error>(
  //   'getTestResultTemplateQuestions',
  //   getTestResultTemplateQuestionsAction,
  //   {
  //     manual: true,
  //   },
  // );
  // const {data: testTemplateQuestionAnswers, 
  //   isFetching: isFetchingTemplateQuestionAnswers, 
  //   refetch: refetchTemplateQuestionAnswers} = useQuery<any, any, Error>(
  //     'getTestResultTemplateQuestionAnswers',
  //     getTestResultTemplateQuestionAnswersAction,
  //     {
  //       manual: true,
  //     },
  //   );

  const [
    createTestResult,
    { status: createStatus, data: createdTestResult },
  ] = useMutation<any, { designateId: number }, Error>(createTestResultAction);

  const isIdle = () => createStatus === 'idle';
  const isLoading = () => createStatus === 'loading';
  if (isIdle() && !createdTestResult){
    createTestResult({designateId: id});
  }
  if (data === undefined && !isFetching) refetch();
  console.log(createdTestResult)
  return {
    createTestResult,
    createStatus: { isIdle, isLoading },
    createdTestResult,
    data: data || {},
  };
};

export default useTestResult;
