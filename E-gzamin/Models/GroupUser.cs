using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_gzamin.Models {
    public class GroupUser {
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public Group Group { get; set; }
        public User User { get; set; }
    }
}
