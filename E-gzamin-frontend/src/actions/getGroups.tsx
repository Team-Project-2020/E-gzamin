import axios from '../lib/axiosInstance';


async function getGroups(): Promise<number> {
    const response = await axios.get('/rest/groups');
    if (response.status === 200) {
        return response.data;
    }
    return response.status;
  }
  
  export default getGroups;