namespace E_gzamin.Models {
    public class QuestionTestTemplate {
        public int QuestionId { get; set; }
        public int TestTemplateId { get; set; }
        public Question Question { get; set; }
        public TestTemplate TestTemplate { get; set; }
    }
}
