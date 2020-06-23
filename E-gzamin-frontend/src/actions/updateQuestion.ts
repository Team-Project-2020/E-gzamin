import axios from '../lib/axiosInstance';

const updateQuestion = async ({ question, courses, id }) => {
  const { data } = await axios.put(`/rest/questions/${id}/`, {question, courses});
  return data;
};

export default updateQuestion;
