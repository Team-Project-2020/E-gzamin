using E_gzamin.GraphQL.GraphTypes;
using E_gzamin.Models;
using E_gzamin.Repositories.Interfaces;
using GraphQL.Types;

namespace E_gzamin.GraphQL.Queries {
    public class UserQuery : ObjectGraphType<User> {
        private readonly IUserRepository _userRepository;

        public UserQuery(IUserRepository userRepository) {
            _userRepository = userRepository;
            FieldAsync<ListGraphType<UserType>>("users",
                resolve: async context => await _userRepository.GetUsers());
            FieldAsync<UserType>("getUserById",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }),
                resolve: async context => await _userRepository.GetUserById(context.GetArgument<int>("id")));
            FieldAsync<UserType>("getUserByEmail",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "email" }),
                resolve: async context => await _userRepository.GetUserByEmail(context.GetArgument<string>("email")));
            FieldAsync<LoginSessionType>("login",
                arguments: new QueryArguments( 
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "email" } ,
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "password"}
                ),
                resolve: async context => await _userRepository.Login(await _userRepository.GetUserByEmail(context.GetArgument<string>("email")), context.GetArgument<string>("password")));
        }
    }
}
