using E_gzamin.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using E_gzamin.GraphQL.Queries;
using E_gzamin.GraphQL.GraphTypes;
using GraphQL.Server;
using GraphQL.Types;
using E_gzamin.Repositories.Interfaces;
using E_gzamin.Repositories;
using E_gzamin.GraphQL.Schemas;
using GraphQL;
using GraphQL.Server.Ui.GraphiQL;
using GraphiQl;

namespace E_gzamin {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddDbContext<EgzaminContext>(
                options => options.UseNpgsql(Configuration.GetConnectionString("MyConnectionString")),
                    ServiceLifetime.Singleton);
            services.AddSingleton<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddControllersWithViews();
            services.AddSingleton<ISchema, UserSchema>();
            services.AddSingleton<UserQuery>();
            services.AddSingleton<UserType>();
            services.AddGraphQL();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseGraphiQl("/graphql", "/v1/yourapi");

        }
    }
}
