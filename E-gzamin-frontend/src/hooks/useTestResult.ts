import { useQuery, useMutation } from 'react-query';

import createTestResultAction from '../actions/createTestResult';
import getTestResultAction from '../actions/getTestResult';
import getTestResultTemplateAction from '../actions/getTestResultTemplate';
import getTestResultTemplateQuestionsAction from '../actions/getTestResultTemplateQuestions';
import getTestResultTemplateQuestionAnswersAction from '../actions/getTestResultTemplateQuestionAnswers';

const useTestResult = id => {
  const { data, isFetching, refetch } = useQuery<any, any, Error>(
    'getTestResult',
    async () => {
      const testResultAction = await getTestResultAction({ testResultId: id });
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
  // console.log(createdTestResult);
  return {
    createTestResult,
    createStatus: { isIdle, isLoading },
    createdTestResult,
    answers: data || [],
  };
};

export default useTestResult;
