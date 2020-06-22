import axios from '../lib/axiosInstance';


const getGroups = async () => {
    const { data } = await axios.get('/rest/groups/?owned=true');
    return data;
};
  
export default getGroups;