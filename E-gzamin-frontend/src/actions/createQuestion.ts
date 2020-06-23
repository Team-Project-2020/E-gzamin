import axios from '../lib/axiosInstance';

const createQuestion = async ({ content, courses }) => {
  const { data } = await axios.post(`/rest/questions/`, {
    content,
    courses,
  });
  return data;
};

export default createQuestion;
