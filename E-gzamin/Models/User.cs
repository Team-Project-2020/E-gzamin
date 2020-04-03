using System.Collections.Generic;

namespace E_gzamin.Models {
    public class User : BaseEntity {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public ICollection<Group>? GroupsOwned { get; set; }
        public ICollection<GroupUser> UserGroups { get; set; }
        public ICollection<TestResult> TestResults { get; set; }
        public ICollection<TestTemplate> TestTemplates { get; set; }
    }
}
