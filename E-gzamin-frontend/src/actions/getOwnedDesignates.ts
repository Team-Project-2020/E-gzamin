import axios from '../lib/axiosInstance';

const getOwnedDesignates = async () => {
  const { data } = await axios.get(`/rest/designates?owned=true`);
  return data;
};

export default getOwnedDesignates;
