import { useQuery, useMutation } from 'react-query';

import { CourseType } from '../types';
import getCoursesAction from '../actions/getCourses';
import createCategoryAction from '../actions/createCourse';

const useCategories = () => {
  const { status, data, error, isFetching, refetch } = useQuery<
    Array<CourseType>,
    any,
    Error
  >('getCourses', getCoursesAction, {
    manual: true,
  });

  const [createCategory] = useMutation<CourseType, string, Error>(
    async name => {
      const response = await createCategoryAction(name);
      refetch();
      return response;
    },
  );
  if (data === undefined && !isFetching) refetch();

  return { categories: data || [], createCategory };
};

export default useCategories;
