using System.Collections.Generic;

namespace E_gzamin.Models {
    public class Question : BaseEntity {
        public string Content { get; set; }
        public ICollection<QuestionTestResult> TestResults { get; set; }
        public ICollection<QuestionTestTemplate> QuestionTestTemplates { get; set; }
        public ICollection<QuestionTemplateQuestion> QuestionTemplateQuestions { get; set; }
    }
}
