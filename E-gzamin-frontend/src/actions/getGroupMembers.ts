import axios from '../lib/axiosInstance';


const getGroupMembers = async ({ id }) => {
    const { data } = await axios.get(`/rest/groups/${id}/members`);

    return data;
};

export default getGroupMembers;