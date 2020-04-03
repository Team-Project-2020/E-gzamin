using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using E_gzamin.Repositories.Interfaces;
using E_gzamin.GraphQL.GraphTypes;

namespace E_gzamin.GraphQL.Queries
{
    public class UserQuery :ObjectGraphType
    {
        private readonly IUserRepository _userRepository;
        
        public UserQuery(IUserRepository userRepository)
        {
            _userRepository = userRepository;

            Field<StringGraphType>("user_name",arguments: new QueryArguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" }), resolve: context => _userRepository.GetNameById(context.GetArgument<int>("id")));
            Field<UserType>("add_user", resolve: context => _userRepository.AddTestUser());
            Field<UserType>("change_user_name",arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id"}, new QueryArgument<StringGraphType> { Name = "new_name" } ), resolve: context => _userRepository.ChangeUserName(context.GetArgument<int>("id"),context.GetArgument<string>("new_name")));
        }
    }
}
