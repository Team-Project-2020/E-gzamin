import { useQuery, useMutation } from 'react-query';

import createTestResultAction from '../actions/createTestResult';
import getTestResultAction from '../actions/getTestResult';

const useTestResult = () => {
  const { data, isFetching, refetch } = useQuery<any, any, Error>(
    'getTestResult',
    getTestResultAction,
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

  return {
    createTestResult,
    createStatus: { isIdle, isLoading },
    createdTestResult,
  };
};

export default useTestResult;
