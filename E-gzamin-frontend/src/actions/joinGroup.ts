import axios from '../lib/axiosInstance';
import { GroupType } from '../types';

const joinGroup = async ({groupCode}): Promise<GroupType> => {
    const { data } = await axios.patch(`/rest/groups/add_user/`, {
        groupCode,
    });
    return data;
};

export default joinGroup;
