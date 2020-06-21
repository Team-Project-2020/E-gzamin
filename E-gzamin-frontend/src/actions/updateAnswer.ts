import axios from '../lib/axiosInstance';

const updateAnswer = async ({ answer, id }) => {
  const { data } = await axios.put(`/rest/questions/${id}/`, answer);
  return data;
};

export default updateAnswer;
