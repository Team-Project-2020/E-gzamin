const questions = [
  {
    id: 0,
    question: "How much does an average male german shepherd (dog) weigh?",
    answers: [],
  },
  {
    id: 1,
    question:
      "How much does an average male german shepherd (dog) weigh How much does an average male german shepherd (dog) weigh?",
    answers: [],
  },
  {
    id: 2,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 3,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 4,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 5,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 6,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 7,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 8,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 9,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 10,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 11,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 12,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 13,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 14,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 15,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 16,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 17,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 18,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 19,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 20,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 21,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 22,
    question: "fdsfsdfsdfsdfs",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
  {
    id: 23,
    question: "fdsfgsdgsfdgsdgfsd",
    answers: [
      { id: 1, text: "30kg", isCorrect: false },
      { id: 2, text: "20kg", isCorrect: false },
      { id: 3, text: "40kg", isCorrect: true },
    ],
  },
];

const categories = [
  { id: 0, name: "math" },
  { id: 1, name: "physics" },
  { id: 2, name: "math" },
  { id: 3, name: "physics" },
  { id: 4, name: "math" },
  { id: 5, name: "math" },
  { id: 6, name: "math" },
  { id: 7, name: "physics" },
  { id: 8, name: "math" },
  { id: 9, name: "physics" },
  { id: 10, name: "math" },
  { id: 11, name: "math" },
  { id: 12, name: "math" },
  { id: 13, name: "physics" },
  { id: 14, name: "math" },
  { id: 15, name: "physics" },
  { id: 16, name: "math" },
  { id: 17, name: "math" },
];

const courses = [
  { id: 3, name: "physics" },
  { id: 4, name: "math" },
  { id: 5, name: "math" },
  { id: 6, name: "math" },
  { id: 7, name: "physics" },
  { id: 8, name: "math" },
  { id: 9, name: "physics" },
  { id: 10, name: "math" },
  { id: 11, name: "math" },
  { id: 12, name: "math" },
  { id: 13, name: "physics" },
  { id: 14, name: "math" },
  { id: 15, name: "physics" },
  { id: 16, name: "math" },
  { id: 17, name: "math" },
];

export { courses, questions, categories };
