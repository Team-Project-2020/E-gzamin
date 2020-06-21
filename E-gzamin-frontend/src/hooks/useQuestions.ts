import { useQuery, useMutation } from "react-query";

import createQuestionAction from "../actions/createQuestion";
import removeQuestionAction from "../actions/removeQuestion";
import updateQuestionAction from "../actions/updateQuestion";

import { QuestionType } from "../types";

import getQuestions from "../actions/getQuestions";

const useQuestions = () => {
  const { status, data, error, isFetching, refetch } = useQuery(
    "getQuestions",
    getQuestions,
    {
      manual: true,
    }
  );
  const [createQuestion] = useMutation<
    QuestionType,
    { content: string },
    Error
  >(async (data) => {
    const response = await createQuestionAction(data);
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
    }
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
