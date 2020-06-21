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
  id?: number;
  content: string;
  isCorrect: boolean;
  question?: number;
  createdAt:Date;
  removedAt?:Date | undefined;
};

type Member = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
};

export type { QuestionType, CourseType, AnswerType, Member };
