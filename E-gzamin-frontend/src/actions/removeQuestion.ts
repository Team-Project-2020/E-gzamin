import axios from '../lib/axiosInstance';

const removeQuestion = async ({ id }) => {
  const { data } = await axios.delete(`/rest/questions/${id}`);
  return data;
};

export default removeQuestion;
