import { useQuery, useMutation } from 'react-query';

import { CourseType } from '../types';
import getCoursesAction from '../actions/getCourses';
import createCategoryAction from '../actions/createCourse';
import removeCategoryAction from '../actions/removeCourse';

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

  const [removeCategory] = useMutation<any, string, Error>(async id => {
    const response = await removeCategoryAction(parseInt(id));
    refetch();
    return response;
  });
  if (data === undefined && !isFetching) refetch();

  return { categories: data || [], createCategory, removeCategory };
};

export default useCategories;
