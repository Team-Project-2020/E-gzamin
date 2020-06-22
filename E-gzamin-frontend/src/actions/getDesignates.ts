import axios from '../lib/axiosInstance';

const getDesignates = async () => {
  const { data } = await axios.get(`/rest/designates/`);
  return data;
};

export default getDesignates;
