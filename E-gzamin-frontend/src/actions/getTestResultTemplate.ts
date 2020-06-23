import axios from '../lib/axiosInstance';

const getTestResultTemplate = async ({ testResultId }: { testResultId: number }) => {
  const { data } = await axios.get(`/rest/testresults/${testResultId}/testtemplate/`);
  return data;
};

export default getTestResultTemplate;
