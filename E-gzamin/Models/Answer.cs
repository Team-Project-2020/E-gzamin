using System.Collections.Generic;

namespace E_gzamin.Models {
    public class Answer : BaseEntity {
        public string Content { get; set; }
        public bool IsCorrect { get; set; }
        public ICollection<AnswerTestResult> AnswerTestResults { get; set; }
        public Question Question { get; set; }
    }
}
