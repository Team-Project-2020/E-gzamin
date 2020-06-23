import { useQuery, useMutation } from 'react-query';

import createTestResultAction from '../actions/createTestResult';
import getTestResultsAction from '../actions/getTestResults';

type testResult = {
  id?: number;
  name: string;
  questions: Array<number>;
};

const useTestResults = () => {
  const { data, isFetching, refetch } = useQuery<any, any, Error>(
    'getTestResults',
    getTestResultsAction,
    {
      manual: true,
    },
  );

  const [createTestResult] = useMutation<any, { designateId: number }, Error>(
    createTestResultAction,
  );

  const getTestResult = id => (data || []).find(result => result?.id === id);

  if (data === undefined && !isFetching) refetch();

  return { testResults: data || [], createTestResult, getTestResult, refetch };
};

export default useTestResults;
