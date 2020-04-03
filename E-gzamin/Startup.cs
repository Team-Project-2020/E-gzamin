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

            app.UseEndpoints(endpoints => {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
