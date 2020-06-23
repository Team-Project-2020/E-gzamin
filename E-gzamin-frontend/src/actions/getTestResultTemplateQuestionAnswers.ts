import axios from '../lib/axiosInstance';

const getTestResultTemplateQuestionAnswers = async ({
  testResultId,
  testTemplateId,
  questionId,
}: {
  testResultId: number;
  testTemplateId: number;
  questionId: number;
}):Promise<Array<any>> => {
  const { data } = await axios.get(
    `/rest/testresults/${testResultId}/testtemplate/${testTemplateId}/questions/${questionId}/answers/`,
  );
  return data;
};

export default getTestResultTemplateQuestionAnswers;
