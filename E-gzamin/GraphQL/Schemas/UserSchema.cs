using E_gzamin.GraphQL.Queries;
using E_gzamin.GraphQL.Mutations;
using GraphQL;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace E_gzamin.GraphQL.Schemas {
    public class UserSchema : Schema {
        public UserSchema(IServiceProvider provider) {
            Query = provider.GetRequiredService<UserQuery>();
            Mutation = provider.GetRequiredService<UserMutation>();
        }
    }
}
