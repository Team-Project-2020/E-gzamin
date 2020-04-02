using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_gzamin.Models {
    public class Group : BaseEntity{
        public string Name { get; set; }
        public string GroupCode { get; set; }
        public DateTime OpenedAt { get; set; }
        public DateTime ClosedAt { get; set; }
        public User Owner { get; set; }
        public int OwnerId { get; set; }
        public ICollection<GroupUser> GroupUsers { get; set; }
    }
}
