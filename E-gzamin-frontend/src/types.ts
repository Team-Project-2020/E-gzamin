type QuestionType = {
  id: number;
  content: string;
  answers?: Array<AnswerType>;
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
type Member = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};
export type { QuestionType, CourseType, AnswerType, Member };
