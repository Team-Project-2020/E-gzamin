using E_gzamin.GraphQL.Queries;
using E_gzamin.GraphQL.Mutations;
using GraphQL;
using GraphQL.Types;

namespace E_gzamin.GraphQL.Schemas {
    public class UserSchema : Schema {
        public UserSchema(IDependencyResolver resolver) : base(resolver) {
            Query = resolver.Resolve<UserQuery>();
            Mutation = resolver.Resolve<UserMutation>();
        }
    }
}
