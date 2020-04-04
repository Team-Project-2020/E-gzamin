using E_gzamin.GraphQL.GraphTypes;
using E_gzamin.Models;
using E_gzamin.Repositories.Interfaces;
using GraphQL.Types;
using System;
using System.Threading.Tasks;

namespace E_gzamin.GraphQL.Queries {
    public class UserMutation : ObjectGraphType {
        private readonly IUserRepository _userRepository;
        public UserMutation(IUserRepository userRepository) {
            _userRepository = userRepository;

            FieldAsync<UserType>("addUser",
                arguments: new QueryArguments(
                            new QueryArgument<NonNullGraphType<AddUserType>> { Name = "user"} ),
                resolve: async context => {
                    Console.WriteLine("test");
                    return await _userRepository.AddUser(context.GetArgument<User>("user"));
                });
            //Field<UserType>("changeName",
            //    arguments: new QueryArguments(
            //                new QueryArgument<IntGraphType> { Name = "id" },
            //                new QueryArgument<StringGraphType> { Name = "new_name" }),
            //    resolve: context => _userRepository.ChangeUserName(context.GetArgument<int>("id"),
            //             context.GetArgument<string>("new_name")));
        }
    }
}
