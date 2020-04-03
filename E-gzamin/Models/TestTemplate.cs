using System.Collections.Generic;

namespace E_gzamin.Models {
    public class TestTemplate : BaseEntity {
        public string Name { get; set; }
        public ICollection<TestResult> TestResults { get; set; }
        public User Owner { get; set; }
        public int OwnerId { get; set; }
        public ICollection<QuestionTestTemplate> QuestionTestTemplates { get; set; }
        public ICollection<QuestionTemplate> QuestionTemplates { get; set; }
        public ICollection<Designate> Designates { get; set; }
    }
}
