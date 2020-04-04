namespace E_gzamin.Models {
    public class QuestionTemplateQuestion {
        public int QuestionId { get; set; }
        public int QuestionTemplateId { get; set; }
        public Question Question { get; set; }
        public QuestionTemplate QuestionTemplate { get; set; }
    }
}
