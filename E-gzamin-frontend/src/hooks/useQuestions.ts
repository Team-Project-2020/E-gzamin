import { useQuery, useMutation } from 'react-query';

import createQuestionAction from '../actions/createQuestion';
import getQuestions from '../actions/getQuestions';

const useQuestions = () => {
  const { status, data, error, isFetching, refetch } = useQuery(
    'getQuestions',
    getQuestions,
    {
      manual: true,
    },
  );
  const [createQuestion] = useMutation(async data => {
    await createQuestionAction(data);
    refetch();
  });
  if (data === undefined && !isFetching) refetch();
  return { questions: data || [], createQuestion };
};

export default useQuestions;
