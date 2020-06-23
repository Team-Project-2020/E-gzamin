import { useQuery, useMutation } from 'react-query';

import createTestTemplateAction from '../actions/createTestTemplate';
import getTestTemplateAction from '../actions/getTestTemplates';

type testTemplate = {
  id?: number;
  name: string;
  questions: Array<number>;
};

const useTestTemplate = () => {
  const { data, isFetching, refetch } = useQuery<
    Array<testTemplate>,
    any,
    Error
  >('getTestTemplate', getTestTemplateAction, {
    manual: true,
  });

  const [createTestTemplate] = useMutation<any, testTemplate, Error>(
    createTestTemplateAction,
  );

  const getTestTemplate = id =>
    (data || []).find(template => template?.id === id);

  if (data === undefined && !isFetching) refetch();

  return {
    refetch,
    testTemplates: data || [],
    createTestTemplate,
    getTestTemplate,
  };
};

export default useTestTemplate;
