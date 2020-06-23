import { useQuery, useMutation } from 'react-query';
import getDesignates from '../actions/getDesignates';
import getOwnedDesignates from '../actions/getOwnedDesignates';

import createDesignateAction from '../actions/createDesignate';
import { DesignateType } from '../types';

const useDesignates = () => {
  const {
    data: ownedDesignates,
    isFetching: isFetchingOwned,
    refetch: refetchOwned,
  } = useQuery<Array<DesignateType>, any, Error>(
    'getOwnedDesignates',
    getOwnedDesignates,
    {
      manual: true,
    },
  );
  const {
    data: designates,
    isFetching: isFetching,
    refetch: refetch,
  } = useQuery<Array<DesignateType>, any, Error>(
    'getDesignates',
    getDesignates,
    {
      manual: true,
    },
  );
  const [createDesignate] = useMutation<any, DesignateType, Error>(
    async designate => {
      const response = await createDesignateAction(designate);
      refetchOwned();
      return response;
    },
  );

  if (designates === undefined && !isFetching) refetch();
  if (ownedDesignates === undefined && !isFetchingOwned) refetchOwned();

  const refetchAll = () => {
    refetch();
    refetchOwned();
  };

  return {
    ownedDesignates: ownedDesignates || [],
    designates: designates || [],
    createDesignate,
    refetchAll,
  };
};

export default useDesignates;
