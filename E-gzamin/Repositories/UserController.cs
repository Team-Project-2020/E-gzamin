using E_gzamin.Models;
using Microsoft.AspNetCore.Mvc;

namespace E_gzamin.Controllers {
    public class UserController {
        private EgzaminContext _egzaminContext;
        public UserController(EgzaminContext ec) {
            _egzaminContext = ec;
        }
        [Route("test")]
        public void AddTestUser() {
            var user = new User { Name = "Kamil", Surname = "NOWAK", Email = "kamilNOWAK@gmail.com", HashedPassword = "1238961iawegdawjfe6q2351268351", Salt = "sul" };
            _egzaminContext.Add(user);
            _egzaminContext.SaveChanges();
        }
    }
}
