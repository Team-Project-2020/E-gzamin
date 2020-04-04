using E_gzamin.Helpers;
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
        public async Task<User> AddUser(User user) {
            var salt = Hashing.GetRandomSalt();
            user.Password = Hashing.HashPassword(user.Password, salt);
            user.Salt = salt;
            await _egzaminContext.AddAsync(user);
            await _egzaminContext.SaveChangesAsync();
            return user;
        }
        public async Task<User> GetUserById(int id) {
            return await _egzaminContext.User.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<User> ChangeUserName(int id, string new_name) {
            var user = GetUserById(id).Result;
            user.Name = new_name;
            await _egzaminContext.SaveChangesAsync();
            return await GetUserById(id);
        }
    }
}
