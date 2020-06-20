import axios from '../lib/axiosInstance';

const getCurrentUser = async () => {
  const { data } = await axios.get('/rest/users/me/');
  return data;
};

export default getCurrentUser;
