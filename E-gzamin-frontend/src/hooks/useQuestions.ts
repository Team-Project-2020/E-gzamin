import { useQuery, useMutation } from 'react-query';

import getQuestionCourses from '../actions/getQuestionCourses';
import createAnswerAction from '../actions/createAnswer';
import getAnswersAction from '../actions/getAnswers';
import removeAnswerAction from '../actions/removeAnswer';
import updateAnswerAction from '../actions/updateAnswer';

import createQuestionAction from '../actions/createQuestion';
import getQuestionsAction from '../actions/getQuestions';
import removeQuestionAction from '../actions/removeQuestion';
import updateQuestionAction from '../actions/updateQuestion';

import { QuestionType, AnswerType } from '../types';

const useQuestions = () => {
  const { status, data, error, isFetching, refetch } = useQuery<
    Array<QuestionType>,
    any,
    Error
  >(
    'getQuestions',
    async () => {
      const questions = await getQuestionsAction();
      return Promise.all(
        questions.map(async question => {
          const answers =
            (await getAnswersAction({ questionId: question.id })) || [];
          const answersWithCreatedAt = answers.map(answer => ({
            ...answer,
            createdAt: new Date(answer.createdAt),
          }));
          const courses = await getQuestionCourses({ questionId: question.id });
          return {
            ...question,
            answers: answersWithCreatedAt,
            courses: courses.map(c => c.id),
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
    { content: string; answers: Array<AnswerType>; courses?: any },
    Error
  >(async ({ content, answers, courses }) => {
    const response = await createQuestionAction({ content, courses });
    await createAnswer(
      answers.map(answer => ({ ...answer, question: response.id })),
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
    await Promise.all(
      question.answers
        .filter(answer => answer.removedAt)
        .map(answer => removeAnswerAction({ id: answer.id })),
    );
    await Promise.all(
      question.answers
        .filter(answers => !answers.removedAt && answers.id)
        .map(
          async answer =>
            await updateAnswerAction({
              answer,
              answerId: answer.id,
            }),
        ),
    );
    await createAnswer(
      question.answers
        .filter(answers => !answers.removedAt && !answers.id)
        .map(answer => ({
          content: answer.content,
          isCorrect: answer.isCorrect,
          question: response.id,
          createdAt: answer.createdAt,
        })),
    );
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
