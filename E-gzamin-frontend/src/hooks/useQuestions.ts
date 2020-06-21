import { useQuery, useMutation } from 'react-query';

import getAnswersAction from '../actions/getAnswers';
import createAnswerAction from '../actions/createAnswer';
import createQuestionAction from '../actions/createQuestion';
import removeQuestionAction from '../actions/removeQuestion';
import updateQuestionAction from '../actions/updateQuestion';

import { QuestionType, AnswerType } from '../types';

import getQuestions from '../actions/getQuestions';

const useQuestions = () => {
  const { status, data, error, isFetching, refetch } = useQuery<
    Array<QuestionType>,
    any,
    Error
  >(
    'getQuestions',
    async () => {
      const questions = await getQuestions();
      console.log(questions);
      return Promise.all(
        questions.map(async question => {
          const answers =
            (await getAnswersAction({ questionId: question.id })) || [];
          const answersWithCreatedAt = answers.map(answer => ({
            ...answer,
            createdAt: new Date(answer.createdAt),
          }));
          return {
            ...question,
            answers: answersWithCreatedAt,
          };
        }),
      );
    },
    {
      manual: true,
    },
  );

  const [createAnswer] = useMutation<
    Array<AnswerType>,
    Array<{
      content: string;
      isCorrect: boolean;
      question: number;
      createdAt: Date;
    }>,
    Error
  >(async answers => {
    return await Promise.all(
      answers.map(async answer => await createAnswerAction(answer)),
    );
  });

  const [createQuestion] = useMutation<
    QuestionType,
    { content: string; answers: Array<AnswerType> },
    Error
  >(async ({ content, answers }) => {
    const response = await createQuestionAction({ content });
    await createAnswer(
      answers.map(answer => ({ question: response.id, ...answer })),
    );
    refetch();
    return response;
  });

  const [updateQuestion] = useMutation<
    QuestionType,
    { id: number; question: QuestionType },
    Error
  >(async ({ id, question }) => {
    const response = await updateQuestionAction({ id, question });
    refetch();
    return response;
  });
  const [removeQuestion] = useMutation<void, { id: number }, Error>(
    async ({ id }) => {
      await removeQuestionAction({ id });
      refetch();
    },
  );
  if (data === undefined && !isFetching) refetch();
  return {
    questions: data || [],
    createQuestion,
    removeQuestion,
    updateQuestion,
  };
};

export default useQuestions;
