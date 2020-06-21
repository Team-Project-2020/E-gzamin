import axios from '../lib/axiosInstance';

const getAnswers = async ({ questionId }) => {
  const { data } = await axios.get(`/rest/questions/${questionId}/answers/`);
  return data;
};

export default getAnswers;
