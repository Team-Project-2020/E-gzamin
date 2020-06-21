import axios from '../lib/axiosInstance';

const updateAnswer = async ({ answer, answerId }) => {
  const { data } = await axios.put(
    `/rest/answers/${answerId}/`,
    answer,
  );
  return data;
};

export default updateAnswer;
