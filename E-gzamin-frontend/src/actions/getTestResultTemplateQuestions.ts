import axios from '../lib/axiosInstance';

const getTestResultTemplateQuestions = async ({ testResultId, testTemplateId }: { testResultId: number, testTemplateId: number }) => {
  const { data } = await axios.get(`/rest/testresults/${testResultId}/testtemplate/${testTemplateId}/questions/`);
  return data;
};

export default getTestResultTemplateQuestions;
