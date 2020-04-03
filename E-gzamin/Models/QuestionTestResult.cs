using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_gzamin.Models {
    public class QuestionTestResult {
        public int QuestionId { get; set; }
        public int TestResultId { get; set; }
        public Question Question { get; set; }
        public TestResult TestResult { get; set; }
    }
}
