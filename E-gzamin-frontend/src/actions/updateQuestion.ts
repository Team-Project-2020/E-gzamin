import axios from '../lib/axiosInstance';

const updateQuestion = async ({ question, id }) => {
  const { data } = await axios.put(`/rest/questions/${id}/`, question);
  return data;
};

export default updateQuestion;
