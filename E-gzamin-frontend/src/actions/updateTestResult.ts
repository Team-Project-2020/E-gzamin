import axios from '../lib/axiosInstance';

const updateTestResult = async ({ testResultId, designateId, questions }) => {
  const { data } = await axios.put(`/rest/testresults/${testResultId}/`, {
    designateId,
    questions,
  });
  return data;
};

export default updateTestResult;
