import React, { useState, useEffect } from 'react';
import useTestResult from '../hooks/useTestResult';

const useTest = id => {
  const [progress, setProgress] = useState<number>(0);
  const {
    createStatus,
    createdTestResult,
    questions,
    testResultStatus,
    results,
    setResults,
    updateTestResult,
  } = useTestResult(id);

  const isChecked = questionId => answerId => {
    return results.find(q => q.id === questionId).answers.includes(answerId);
  };

  const toggleResult = questionId => answerId => {
    const oldResult = results.find(q => q.id === questionId);

    if (oldResult.answers.includes(answerId)) {
      setResults([
        ...results.filter(q => q.id !== questionId),
        {
          id: questionId,
          answers: oldResult.answers.filter(ans => ans !== answerId),
        },
      ]);
    } else {
      setResults([
        ...results.filter(q => q.id !== questionId),
        { id: questionId, answers: [...oldResult.answers, answerId] },
      ]);
    }
  };

  const status = {
    isReady: () =>
      !createStatus.isIdle() &&
      !createStatus.isLoading() &&
      testResultStatus === 'success' &&
      questions.length,
  };

  return {
    status,
    progress,
    setProgress,
    testResult: createdTestResult,
    updateTestResult,
    toggleResult,
    isChecked,
    questions,
    results,
  };
};

export default useTest;
