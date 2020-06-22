import { useQuery, useMutation } from 'react-query';
import { Member } from '../types';
import getGroupMembers from '../actions/getGroupMembers';
import removeGroupMemberAction from '../actions/removeGroupMember'

const useGroupMembers = ({ id }) => {
  const { data, isFetching, refetch } = useQuery<
    Array<Member>,
    any,
    Error
  >(`getGroupMembers${id}`, () => getGroupMembers({ id }), {
    manual: true,
  });
  const [removeGroupMember] = useMutation<void, { id: number, userId: number }, Error>(
    async ({ id, userId }) => {
      await removeGroupMemberAction({ id, userId });
      refetch();
    },
  );
  if (data === undefined && !isFetching) refetch();
  return { groupMembers: data || [], removeGroupMember };
};

export default useGroupMembers;
