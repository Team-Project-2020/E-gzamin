using System;

namespace E_gzamin.Models {
    public class BaseEntity {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? RemovedAt { get; set; }
    }
}
