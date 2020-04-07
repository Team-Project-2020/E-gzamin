using E_gzamin.Models;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace E_gzamin.GraphQL.GraphTypes {
    public class LoginSessionType : ObjectGraphType<User> {
        public LoginSessionType() {
            Field(user => user.Id);
            Field(user => user.SessionToken);
        }
    }
}
