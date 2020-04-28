namespace E_gzamin.Models {
    public class QuestionCourse {
        public int QuestionId { get; set; }
        public int CourseId { get; set; }
        public Question Question { get; set; }
        public Course Course { get; set; }
    }
}
