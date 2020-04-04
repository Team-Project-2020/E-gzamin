using E_gzamin.Models;
using System.Threading.Tasks;

namespace E_gzamin.Repositories.Interfaces {
    public interface IUserRepository {
        public Task<User> GetUserById(int id);
        public Task<User> ChangeUserName(int id, string new_name);
        public Task<User> AddUser(User user);
    }
}
