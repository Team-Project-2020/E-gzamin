import { useQuery, useMutation } from 'react-query';
import { GroupMembers } from '../types';
import getGroupMembers from '../actions/getGroupMembers';

const useGroupMembers = ({ id }) => {
  const { data, isFetching, refetch } = useQuery<
    Array<GroupMembers>,
    any,
    Error
  >(['getGroupMembers'], () => getGroupMembers({ id }), {
    manual: true,
  });

  if (data === undefined && !isFetching) refetch();
  return { groupMembers: data || [] };
};

export default useGroupMembers;
