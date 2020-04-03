using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using E_gzamin.Models;

namespace E_gzamin.GraphQL.GraphTypes
{    public class UserType : ObjectGraphType<User>
    {
        public UserType()
        {
            Field(user => user.Id);
            Field(user => user.Name);
            Field(user => user.Surname);
            Field(user => user.Email);
            Field(user => user.HashedPassword);
            Field(user => user.Salt);
        }
    }
}
