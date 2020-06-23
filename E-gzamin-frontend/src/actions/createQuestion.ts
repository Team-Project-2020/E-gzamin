import axios from '../lib/axiosInstance';

const createQuestion = async ({ content }) => {
  const { data } = await axios.post(`/rest/questions/`, { content });
  return data;
};

export default createQuestion;
