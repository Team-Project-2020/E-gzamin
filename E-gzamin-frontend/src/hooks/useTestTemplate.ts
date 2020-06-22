import { useQuery, useMutation } from 'react-query';

import createTestTemplateAction from '../actions/createTestTemplate';
import getTestTemplateAction from '../actions/getTestTemplates';

type testTemplate = {
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

  if (data === undefined && !isFetching) refetch();

  return { testTemplates: data || [], createTestTemplate };
};

export default useTestTemplate;
