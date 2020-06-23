import axios from '../lib/axiosInstance';

const getTestResult = async ({ testResultId }: { testResultId: number }) => {
  const { data } = await axios.get(`/rest/testresults/${testResultId}/`);
  return data;
};

export default getTestResult;
