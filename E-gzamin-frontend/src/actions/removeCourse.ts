import axios from '../lib/axiosInstance';

const removeCourse = async id => {
  const { data } = await axios.delete(`/rest/courses/${id}`);
  return data;
};

export default removeCourse;
