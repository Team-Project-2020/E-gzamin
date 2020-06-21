import axios from '../lib/axiosInstance';

const leaveGroup = async ({ id }) => {
    const { data } = await axios.delete(`/rest/groups/${id}/leave_group/`);
    return data;
};

export default leaveGroup;
