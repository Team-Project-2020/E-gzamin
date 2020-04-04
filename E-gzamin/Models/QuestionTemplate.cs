using System.Collections.Generic;

namespace E_gzamin.Models {
    public class QuestionTemplate : BaseEntity {
        public int QuestionsCount { get; set; }
        public ICollection<QuestionTemplateQuestion> QuestionTemplateQuestions { get; set; }
        public TestTemplate TestTemplate { get; set; }
        public int TestTemplateId { get; set; }
    }
}
