namespace E_gzamin.Models {
    public class QuestionSubject {
        public int QuestionId { get; set; }
        public int SubjectId { get; set; }
        public Question Question { get; set; }
        public Subject Subject { get; set; }
    }
}
