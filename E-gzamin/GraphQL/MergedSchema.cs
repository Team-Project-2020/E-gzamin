using GraphQL;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace E_gzamin.GraphQL {
    public class MergedSchema : Schema {
        public MergedSchema(IServiceProvider provider) {
            foreach (var schemaType in Assembly.GetExecutingAssembly().GetExportedTypes().Where(t => t.Namespace == "E_gzamin.GraphQL.Schemas")) {
                ISchema instance = (ISchema)Activator.CreateInstance(schemaType, provider);
                foreach (var field in instance.Query.Fields) {
                    Query.AddField(field);
                }
                foreach (var field in instance.Mutation.Fields) {
                    Mutation.AddField(field);
                }
            }
        }
    }
}
