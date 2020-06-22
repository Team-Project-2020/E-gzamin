import axios from '../lib/axiosInstance';

const createAnswer = async ({ content, isCorrect, question, createdAt }) => {
  const { data } = await axios.post(`/rest/answers/`, {
    content,
    isCorrect,
    question,
    createdAt,
  });
  return data;
};

export default createAnswer;
