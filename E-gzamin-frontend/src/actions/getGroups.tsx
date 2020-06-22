import axios from '../lib/axiosInstance';


const getGroups = async () => {
    const { data } = await axios.get('/rest/groups');
    return data;
};
  
export default getGroups;