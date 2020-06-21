import axios from '../lib/axiosInstance';

const getQuestions = async () => {
  const { data } = await axios.get('/rest/questions/');
  return data;
};

export default getQuestions;
