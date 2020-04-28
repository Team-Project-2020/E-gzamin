using E_gzamin.Models;
using E_gzamin.Repositories.Interfaces;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BCrypt.Net;

namespace E_gzamin.Repositories {
    public class UserRepository : IUserRepository {
        private EgzaminContext _egzaminContext;
        private IServiceProvider _provider;
        public UserRepository(EgzaminContext ec) {
            _egzaminContext = ec;
        }
        public async Task<List<User>> GetUsers() {
            return await _egzaminContext.User.ToListAsync();
        }
        public async Task<User> GetUserById(int id) {
            return await _egzaminContext.User.FirstOrDefaultAsync(p => p.Id == id);
        }
        public async Task<User> GetUserByEmail(string email) {
            return await _egzaminContext.User.FirstOrDefaultAsync(p => p.Email == email);
        }
        public async Task<User> AddUser(User user) {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await _egzaminContext.AddAsync(user);
            await _egzaminContext.SaveChangesAsync();
            return user;
        }
        public async Task<User> ChangeUserName(int id, string new_name) {
            var user = GetUserById(id).Result;
            user.Name = new_name;
            await _egzaminContext.SaveChangesAsync();
            return await GetUserById(id);
        }
        public async Task<string> Login(User user, string password) {
            if (!BCrypt.Net.BCrypt.Verify(password, user.Password)) return null;
            var token = new JwtBuilder()
                .WithAlgorithm(new HMACSHA256Algorithm())
                .WithSecret(System.Environment.GetEnvironmentVariable("SECRET_KEY"))
                .AddClaim("exp", DateTimeOffset.UtcNow.AddDays(7).ToUnixTimeSeconds())
                .AddClaim("id", user.Id.ToString())
                .Encode();
            user.SessionToken = token;
            await _egzaminContext.SaveChangesAsync();
            return token;
        }
    }
}
