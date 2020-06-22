import { useQuery, useMutation } from 'react-query';

import { GroupType } from '../types';
import getGroups from '../actions/getGroups';
import getOwnedGroups from '../actions/getOwnedGroups';
import createGroupAction from '../actions/createGroup';
import removeGroupAction from '../actions/removeGroup';
import joinGroupAction from '../actions/joinGroup';
import leaveGroupAction from '../actions/leaveGroup';

const useGroups = () => {
  const {
    data: groups,
    isFetching: isFetchingGroups,
    refetch: refetchGroups,
  } = useQuery<Array<GroupType>, any, Error>('getGroups', getGroups, {
    manual: true,
  });
  const {
    data: ownedGroups,
    isFetching: isFetchingOwnedGroups,
    refetch: refetchOwnedGroups,
  } = useQuery<Array<GroupType>, any, Error>('getOwnedGroups', getOwnedGroups, {
    manual: true,
  });

  const [createGroup] = useMutation<
    GroupType,
    { name: string; code: string },
    Error
  >(async ({ name, code }) => {
    const response = await createGroupAction(name, code);
    refetchOwnedGroups();
    return response;
  });
  const [removeGroup] = useMutation<void, { id: number }, Error>(
    async ({ id }) => {
      await removeGroupAction({ id });
      refetchOwnedGroups();
    },
  );
  const [leaveGroup] = useMutation<void, { id: number }, Error>(
    async ({ id }) => {
      await leaveGroupAction({ id });
      refetchGroups();
    },
  );
  const [joinGroup] = useMutation<void, { groupCode: string }, Error>(
    async ({ groupCode }) => {
      await joinGroupAction({ groupCode });
      refetchGroups();
    },
  );

  const getGroup = id =>
    [...(groups || []), ...(ownedGroups || [])].find(group => group.id === id);

  if (groups === undefined && !isFetchingGroups) refetchGroups();
  if (ownedGroups === undefined && !isFetchingOwnedGroups) refetchOwnedGroups();

  return {
    groups: groups || [],
    ownedGroups: ownedGroups || [],
    createGroup,
    removeGroup,
    joinGroup,
    leaveGroup,
    getGroup,
  };
};

export default useGroups;
