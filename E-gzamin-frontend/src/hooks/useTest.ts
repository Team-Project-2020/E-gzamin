import React, { useState } from 'react';
import useTestResult from '../hooks/useTestResult';

const useTest = id => {
  const [progress, setProgress] = useState<number>(0);
  const [results, setResults] = useState([{ questionId: 2, answers: [1] }]);

  //unused
  const updateResult = (questionId, { answers, answer }) => {
    if (answers) {
      const newResults = [
        ...results.filter(q => q.questionId !== questionId),
        { questionId, answers },
      ];
      setResults(newResults);
    } else if (answer && answer.id) {
      const oldResult = results.find(q => q.questionId === questionId);
      const newResults = [
        ...results.filter(q => q.questionId !== questionId),
        { questionId, answers },
      ];
    }
  };
  const isChecked = questionId => answerId =>
    results.find(q => q.questionId === questionId).answers.includes(answerId);

  const toggleResult = questionId => answerId => {
    const oldResult = results.find(q => q.questionId === questionId);
    if (oldResult.answers.includes(answerId)) {
      setResults([
        ...results.filter(q => q.questionId !== questionId),
        {
          questionId,
          answers: oldResult.answers.filter(ans => ans !== answerId),
        },
      ]);
    } else {
      setResults([
        ...results.filter(q => q.questionId !== questionId),
        { questionId, answers: [...oldResult.answers, answerId] },
      ]);
    }
  };

  const {
    createTestResult,
    createStatus,
    createdTestResult: testResult,
  } = useTestResult();
  if (createStatus.isIdle()) createTestResult({ designateId: id });

  const status = {
    isReady: () => !createStatus.isIdle() && !createStatus.isLoading(),
  };

  return { status, progress, setProgress, testResult, toggleResult, isChecked };
};

export default useTest;
