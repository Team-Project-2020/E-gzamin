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
            ///////////////////////////////
            //IN CASE OF FIRE BREAK GLASS//
            ///////////////////////////////
            var assem = Assembly.GetExecutingAssembly().GetExportedTypes();
            var queryFields = new List<FieldType>();
            var mutationFields = new List<FieldType>();

            var queryTypes = assem.Where(t => (t.Namespace == ("E_gzamin.GraphQL.Queries")));
            foreach (var queryType in queryTypes) {
                var query = (IObjectGraphType)provider.GetRequiredService(queryType);
                queryFields.Concat(query.Fields);
                Query = query;
            }

            var mutationTypes = assem.Where(t => (t.Namespace == ("E_gzamin.GraphQL.Mutations")));
            foreach (var mutationType in mutationTypes) {
                var mutation = (IObjectGraphType)provider.GetRequiredService(mutationType);
                mutationFields.Concat(mutation.Fields);
                Mutation = mutation;
            }
            foreach (var field in queryFields) {
                Query.AddField(field);
            }
            foreach (var field in mutationFields) {
                Mutation.AddField(field);
            }
        }
    }
}
