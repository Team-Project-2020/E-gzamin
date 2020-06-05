using E_gzamin.Models;
using GraphQL.Types;

namespace E_gzamin.GraphQL.GraphTypes {
    public class AddUserType : InputObjectGraphType<User> {
        public AddUserType() {
            Field(user => user.Name);
            Field(user => user.Surname);
            Field(user => user.Email);
            Field(user => user.Password);
        }
    }
}
