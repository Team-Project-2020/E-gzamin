import axios from '../lib/axiosInstance';
import { GroupType } from '../types';

const createGroup = async (name, groupCode): Promise<GroupType> => {
  const { data } = await axios.post(`/rest/groups/`, {
    name,
    groupCode,
  });
  return data;
};

export default createGroup;
