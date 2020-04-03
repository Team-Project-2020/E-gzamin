using System;
using System.Collections.Generic;

namespace E_gzamin.Models {
    public class TestResult : BaseEntity {
        public int Result { get; set; }
        public int MaxPoints { get; set; }
        public bool isPassed { get; set; }
        public DateTime CompletedAt { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime FinishedAt { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public TestTemplate TestTemplate { get; set; }
        public int TestTemplateId { get; set; }
        public ICollection<QuestionTestResult> QuestionTestResults { get; set; }
    }
}
