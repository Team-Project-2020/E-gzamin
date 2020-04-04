using E_gzamin.Models;
using E_gzamin.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace E_gzamin.Repositories {
    public class UserRepository : IUserRepository {
        private EgzaminContext _egzaminContext;
        public UserRepository(EgzaminContext ec) {
            _egzaminContext = ec;
        }
        public async Task<User> AddTestUser() {
            var user = new User { Name = "Kamil", Surname = "NOWAK", Email = "kamilNOWAK@gmail.com", HashedPassword = "1238961iawegdawjfe6q2351268351", Salt = "sul" };
            await _egzaminContext.AddAsync(user);
            System.Console.WriteLine("chuj");
            await _egzaminContext.SaveChangesAsync();
            return user;
        }
        public async Task<User> GetUserById(int id) {
            return await _egzaminContext.Users.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<User> ChangeUserName(int id, string new_name) {
            var user = GetUserById(id).Result;
            user.Name = new_name;
            await _egzaminContext.SaveChangesAsync();
            return await GetUserById(id);
        }
    }
}
