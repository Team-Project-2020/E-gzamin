using System.Threading.Tasks;
using GraphQL;
using Microsoft.AspNetCore.Mvc;
using E_gzamin.Graphql;
using E_gzamin.GraphQL.Schemas;

namespace E_gzamin.Controllers {

    [Route("graphql")]
    [ApiController]
    public class GraphQLController : ControllerBase {
        private IDependencyResolver _resolver;
        GraphQLController(IDependencyResolver r) {
            _resolver = r;
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GraphQLQuery query) {
            var schema = new UserSchema(_resolver);
            var inputs = query.Variables.ToInputs();

            var result = await new DocumentExecuter().ExecuteAsync(_ =>
            {
                _.Schema = schema;
                _.Query = query.Query;
                _.OperationName = query.OperationName;
                _.Inputs = inputs;
            });

            if (result.Errors?.Count > 0) {
                return BadRequest();
            }

            return Ok(result);
        }
    }
}