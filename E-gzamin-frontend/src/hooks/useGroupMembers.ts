import { useQuery, useMutation } from 'react-query';
import { Member } from '../types';
import getGroupMembers from '../actions/getGroupMembers';
import removeGroupMemberAction from '../actions/removeGroupMember'

const useGroupMembers = ({ id }):  { groupMembers: Array<Member> } => {
  const { data, isFetching, refetch } = useQuery<
    Array<Member>,
    any,
    Error
  >(`getGroupMembers${id}`, () => getGroupMembers({ id }), {
    manual: true,
  });

  if (data === undefined && !isFetching) refetch();
  return { groupMembers: data || [], };
};

export default useGroupMembers;
