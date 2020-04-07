using E_gzamin.GraphQL.GraphTypes;
using E_gzamin.GraphQL.Queries;
using E_gzamin.GraphQL.Mutations;
using E_gzamin.Models;
using E_gzamin.Repositories;
using E_gzamin.Repositories.Interfaces;
using GraphiQl;
using GraphQL;
using GraphQL.Server;
using GraphQL.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Linq;
using System.Reflection;
using E_gzamin.GraphQL;
using JWT;

namespace E_gzamin {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<IISServerOptions>(options => {
                options.AllowSynchronousIO = true; //!!!TEMPORARY SOLUTION!!!
            });
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtAuthenticationDefaults.AuthenticationScheme;
            })
            .AddJwt(options =>
            {
                    // secrets
                    options.Keys = new[] { System.Environment.GetEnvironmentVariable("SECRET_KEY") };

                    // force JwtDecoder to throw exception if JWT signature is invalid
                    options.VerifySignature = true;
            });
            services.AddDbContext<EgzaminContext>(
                options => options.UseNpgsql(Configuration.GetConnectionString("MyConnectionString")),
                    ServiceLifetime.Singleton);
            services.AddControllers();
            services.AddSingleton<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));

            var assem = Assembly.GetExecutingAssembly().GetExportedTypes();
            var repositoryTypes = assem.Where(t => (t.Namespace == ("E_gzamin.Repositories")));
            foreach (var repositoryType in repositoryTypes)
            {
                services.AddTransient(repositoryType.GetInterface($"I{repositoryType.Name}"), repositoryType);
            }

            var mutationTypes = assem.Where(t => (t.Namespace == ("E_gzamin.GraphQL.Mutations")));
            foreach (var mutationType in mutationTypes)
            {
                services.AddSingleton(mutationType);
            }

            var queryTypes = assem.Where(t => (t.Namespace == ("E_gzamin.GraphQL.Queries")));
            foreach (var queryType in queryTypes)
            {
                services.AddSingleton(queryType);
            }

            var typeTypes = assem.Where(t => (t.Namespace == ("E_gzamin.GraphQL.GraphTypes")));
            foreach (var typeType in typeTypes)
            {
                services.AddSingleton(typeType);
            }
            services.AddGraphQL();
            services.AddSingleton<ISchema, MergedSchema>();

        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseGraphQL<ISchema>("/graphql");

            app.UseGraphiQl("/graphiql", "/graphql");

            app.UseEndpoints(endpoints => {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
