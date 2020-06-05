using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace E_gzamin.Models {
    public class User : BaseEntity {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public ICollection<Group>? GroupsOwned { get; set; }
        public ICollection<GroupUser> UserGroups { get; set; }
        public ICollection<TestResult> TestResults { get; set; }
        public ICollection<TestTemplate> TestTemplates { get; set; }
        [NotMapped]
        public object SessionToken;
    }
}
