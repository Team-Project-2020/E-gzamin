using E_gzamin.GraphQL.GraphTypes;
using E_gzamin.Repositories.Interfaces;
using GraphQL.Types;

namespace E_gzamin.GraphQL.Queries {
    public class UserMutation : ObjectGraphType {
        private readonly IUserRepository _userRepository;
        public UserMutation(IUserRepository userRepository) {
            _userRepository = userRepository;

            Field<UserType>("addTestUser",
                resolve: context => {
                    return _userRepository.AddTestUser();
                });
            Field<UserType>("changeName",
                arguments: new QueryArguments(
                            new QueryArgument<IntGraphType> { Name = "id" },
                            new QueryArgument<StringGraphType> { Name = "new_name" }),
                resolve: context => _userRepository.ChangeUserName(context.GetArgument<int>("id"),
                         context.GetArgument<string>("new_name")));
        }
    }
}
