using System.Collections.Generic;

namespace E_gzamin.Models {
    public class Course : BaseEntity {
        public string Name { get; set; }
        public ICollection<QuestionCourse> QuestionCourses { get; set; }
    }
}
