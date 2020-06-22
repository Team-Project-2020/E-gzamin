import axios from '../lib/axiosInstance';

const getTestResults = async () => {
  const { data } = await axios.get('/rest/testresults/');
  return data;
};

export default getTestResults;
