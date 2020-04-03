using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using E_gzamin.Models;

namespace E_gzamin.Repositories.Interfaces
{
    public interface IUserrepository
    {
        public User AddTestUser();
        public string GetNameById(int id);
        public User ChangeUserName(int id, string new_name);
    }
}
