using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_gzamin.Models {
    public class Designate {
        public int GroupId { get; set; }
        public int TestTemplateId { get; set; }
        public Group Group { get; set; }
        public TestTemplate TestTemplate { get; set; }
        public int Time { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal PassReq { get; set; }
    }
}
