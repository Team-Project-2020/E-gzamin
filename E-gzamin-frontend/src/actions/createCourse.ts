import axios from '../lib/axiosInstance';
import { CourseType } from '../types';

const createCourse = async (name): Promise<CourseType> => {
  const { data } = await axios.post(`/rest/courses/`, {
    name,
  });
  return data;
};

export default createCourse;
