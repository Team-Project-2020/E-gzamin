import axios from '../lib/axiosInstance';

const createTestResult = async ({ designateId }) => {
  const { data } = await axios.post(`/rest/testresults/`, {
    designateId,
  });
  return data;
};

export default createTestResult;
