type QuestionType = {
  id: number;
  question: string;
  answers: Array<AnswerType>;
};

type CourseType = {
  id: number;
  name: string;
};

type AnswerType = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type { QuestionType, CourseType, AnswerType };
