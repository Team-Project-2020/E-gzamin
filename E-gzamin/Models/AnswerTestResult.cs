namespace E_gzamin.Models {
    public class AnswerTestResult {
        public int AnswerId { get; set; }
        public int TestResultId { get; set; }
        public Answer Answer { get; set; }
        public TestResult TestResult { get; set; }
    }
}
