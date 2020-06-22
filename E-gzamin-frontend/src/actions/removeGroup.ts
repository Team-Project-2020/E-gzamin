import axios from '../lib/axiosInstance';

const removeGroup = async ({ id }) => {
    const { data } = await axios.delete(`/rest/groups/${id}`);
    return data;
};

export default removeGroup;
