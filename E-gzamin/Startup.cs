using E_gzamin.GraphQL.GraphTypes;
using E_gzamin.GraphQL.Queries;
using E_gzamin.GraphQL.Schemas;
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

namespace E_gzamin {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.Configure<IISServerOptions>(options => {
                options.AllowSynchronousIO = true; //!!!TEMPORARY SOLUTION!!!
            });
            services.AddDbContext<EgzaminContext>(
                options => options.UseNpgsql(Configuration.GetConnectionString("MyConnectionString")),
                    ServiceLifetime.Singleton);
            services.AddControllers();
            services.AddSingleton<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddSingleton<UserMutation>();
            services.AddSingleton<UserQuery>();
            services.AddSingleton<UserType>();
            services.AddSingleton<AddUserType>();
            services.AddGraphQL();
            var sp = services.BuildServiceProvider();
            services.AddSingleton<ISchema>(new UserSchema(new FuncDependencyResolver(type => sp.GetService(type))));
        }
        //public void ConfigureServices(IServiceCollection services) {
        //    services.AddControllers();
        //    services.Configure<IISServerOptions>(options => {
        //        options.AllowSynchronousIO = true; //!!!TEMPORARY SOLUTION!!!
        //    });
        //    services.AddDbContext<EgzaminContext>(
        //        options => options.UseNpgsql(Configuration.GetConnectionString("MyConnectionString")),
        //            ServiceLifetime.Singleton);
        //    services.AddSingleton<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));
        //    var repositoryTypes = Assembly.GetEntryAssembly().GetExportedTypes()
        //        .Where(t => t.Namespace.ToString() == "E_gzamin.Repositories");
        //    foreach (var repositoryType in repositoryTypes) {
        //        services.AddTransient(repositoryType.GetInterface($"I{repositoryType.Name}"), repositoryType);
        //    }
        //    var graphTypes = typeof(ObjectGraphType).
        //        GetTypeInfo().Assembly.DefinedTypes
        //        .Where(t => typeof(ObjectGraphType).GetTypeInfo().IsAssignableFrom(t.AsType()) && t.IsClass)
        //        .Select(p => p.AsType()).Concat(
        //        typeof(InputObjectGraphType).
        //        GetTypeInfo().Assembly.DefinedTypes
        //        .Where(t => typeof(InputObjectGraphType).GetTypeInfo().IsAssignableFrom(t.AsType()) && t.IsClass)
        //        .Select(p => p.AsType()));
        //    foreach (var graphType in graphTypes) {
        //        services.AddSingleton(graphType);
        //    }
        //    var schemaTypes = typeof(Schema)
        //        .GetTypeInfo().Assembly.DefinedTypes
        //        .Where(t => typeof(Schema).GetTypeInfo().IsAssignableFrom(t.AsType()) && t.IsClass)
        //        .Select(p => p.AsType());
        //    //foreach (var schemaType in schemaTypes) {
        //    //    services.AddSingleton<ISchema>(Activator.CreateInstance(schemaType, new FuncDependencyResolver(type => sp.GetService(type)) ));
        //    //} TODO dynamic schema singletons
        //    services.AddGraphQL();
        //    var sp = services.BuildServiceProvider();
        //    services.AddSingleton<ISchema>(new UserSchema(new FuncDependencyResolver(type => sp.GetService(type))));
        //}

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
