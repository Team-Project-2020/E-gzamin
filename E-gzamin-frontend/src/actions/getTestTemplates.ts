import axios from '../lib/axiosInstance';

const getTestTemplates = async () => {
  const { data } = await axios.get('/rest/testtemplates/');
  return data;
};

export default getTestTemplates;
