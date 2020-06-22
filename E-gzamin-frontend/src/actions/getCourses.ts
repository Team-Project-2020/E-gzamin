import axios from '../lib/axiosInstance';

const getCourses = async () => {
  const { data } = await axios.get('/rest/courses/');
  return data;
};

export default getCourses;
