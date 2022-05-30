using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

using Intranet.API.Models;
using System.Reflection;
using System.IO;

namespace Intranet.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //--- adicionar CORS

            services.AddCors( o => o.AddPolicy(
                "IntranetAPI",
                builder => { builder.AllowAnyOrigin()
                                    .AllowAnyMethod()
                                    .AllowAnyHeader();}
            ));

            //--- adicionar o DbContext

            var strConn = Configuration.GetConnectionString("ProdConnection"); //"DefaultConnection");

            Console.WriteLine(strConn);

            services.AddDbContext<IntranetApiContext>(options => options.UseSqlServer(strConn));

            //--- adicionar os controllers

            services.AddControllers();

            //--- adicionar o Swagger

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                 new OpenApiInfo 
                    { 
                        Title = "Intranet.API",
                        Version = "v1",
                        Description = "TCMSP - Intranet.API: Provê dados referentes ao ambiente de Intranet do Tribunal de Contas do Município de SP",
                        Contact = new OpenApiContact
                        {
                            Name = "Unidade Técnica de Desenvolvimento de Sistemas - UTDS-TCMSP",
                            Email = "utds@tcm.sp.gov.br",
                            Url = new Uri("https://portal.tcm.sp.gov.br/"),
                        }
                    });

                //--- Swagger comments path

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);

                c.IncludeXmlComments(xmlPath);

            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Intranet.API v1"));
            }

            // app.UseHttpsRedirection(); //-> HACK! Verificar!

            app.UseRouting();

            app.UseCors();  // --- adicionar Cors

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            // armazena as pastas raiz do app no AppDomain

            AppDomain.CurrentDomain.SetData("ContentRootPath", env.ContentRootPath);
            AppDomain.CurrentDomain.SetData("WebRootPath", env.WebRootPath);

        }
    }
}
