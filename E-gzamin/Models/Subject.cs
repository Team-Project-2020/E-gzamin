using System.Collections.Generic;

namespace E_gzamin.Models {
    public class Subject : BaseEntity {
        public string Name { get; set; }
        public ICollection<QuestionSubject> QuestionSubjects { get; set; }
    }
}
