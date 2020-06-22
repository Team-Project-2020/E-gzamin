import { useQuery, useMutation } from 'react-query';
import getDesignates from '../actions/getDesignates';
import createDesignateAction from '../actions/createDesignate';
import { DesignateType } from '../types';

const useDesignates = () => {
  const { status, data, error, isFetching, refetch } = useQuery<
    Array<DesignateType>,
    any,
    Error
  >('getDesignates', getDesignates, {
    manual: true,
  });
  const [createDesignate] = useMutation<any, DesignateType, Error>(
    async designate => {
      const response = await createDesignateAction(designate);
      refetch();
      return response;
    },
  );
  if (data === undefined && !isFetching) refetch();

  return { designates: data || [], createDesignate };
};

export default useDesignates;
