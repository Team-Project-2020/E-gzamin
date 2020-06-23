import axios from '../lib/axiosInstance';

const getQuestionCourses = async ({ questionId }) => {
  const { data } = await axios.get(`/rest/questions/${questionId}/courses/`);
  return data;
};

export default getQuestionCourses;
