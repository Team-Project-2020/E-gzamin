import axios from '../lib/axiosInstance';

const createTestTemplate = async ({ name, questions }) => {
  const { data } = await axios.post(`/rest/testtemplates/`, {
    name,
    questions,
  });
  return data;
};

export default createTestTemplate;
