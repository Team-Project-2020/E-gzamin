using E_gzamin.Models;
using Microsoft.AspNetCore.Mvc;

namespace E_gzamin.Controllers {
    public class UserController {
        private EgzaminContext _egzaminContext;
        public UserController(EgzaminContext ec) {
            _egzaminContext = ec;
        }
        [Route("test")]
        public User AddTestUser() {
            var user = new User { Name = "Kamil", Surname = "NOWAK", Email = "kamilNOWAK@gmail.com", HashedPassword = "1238961iawegdawjfe6q2351268351", Salt = "sul" };
            _egzaminContext.Add(user);
            _egzaminContext.SaveChanges();
            return user;
        }
        public string GetNameById(int id)
        {
            return _egzaminContext.Users.Find(id).Name;
        }

        public User ChangeUserName(int id, string new_name)
        {
            _egzaminContext.Users.Find(id).Name = new_name;
            _egzaminContext.SaveChanges();
            return _egzaminContext.Users.Find(id);
        }
    }
}
