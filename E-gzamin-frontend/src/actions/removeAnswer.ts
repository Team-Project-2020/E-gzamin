import axios from '../lib/axiosInstance';

const removeAnswer = async ({ id }) => {
  const { data } = await axios.delete(`/rest/answers/${id}`);
  return data;
};

export default removeAnswer;
