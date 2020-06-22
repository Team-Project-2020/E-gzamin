import axios from '../lib/axiosInstance';

const removeGroupMember = async ({ id, userId }) => {
    const { data } = await axios.delete(`/rest/groups/${id}/remove_user?id=${userId}`);
    return data;
};

export default removeGroupMember;
