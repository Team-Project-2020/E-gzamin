using E_gzamin.GraphQL.GraphTypes;
using E_gzamin.Models;
using E_gzamin.Repositories.Interfaces;
using GraphQL.Types;

namespace E_gzamin.GraphQL.Queries {
    public class UserQuery : ObjectGraphType<User> {
        private readonly IUserRepository _userRepository;

        public UserQuery(IUserRepository userRepository) {
            _userRepository = userRepository;
            Field<UserType>("users",
                resolve: context => _userRepository.GetUsers());
            Field<UserType>("getUserById",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }),
                resolve: context => _userRepository.GetUserById(context.GetArgument<int>("id")));
            Field<UserType>("getUserByEmail",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "email" }),
                resolve: context => _userRepository.GetUserByEmail(context.GetArgument<string>("email")));
        }
    }
}
