using Domain.Entities.Account;
using EFAccess.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.AzureAppServices;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDbAccess.Configs;
using Swashbuckle.AspNetCore.SwaggerUI;
using System.Security.Claims;
using System.Text;
using WebAPI.Utils.Configs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddLogging(c =>
{
    c.AddDebug();
    c.AddConsole();
    c.AddAzureWebAppDiagnostics();
});

builder.Services.Configure<AzureFileLoggerOptions>(options =>
{
    options.FileName = "azure-diagnostics-ecommerce-";
    options.FileSizeLimit = 50 * 1024;
    options.RetainedFileCountLimit = 5;
});

builder.Services.Configure<AzureBlobLoggerOptions>(options =>
{
    options.BlobName = "ecommerce-log.txt";
});

string appAccountConnectionString = Environment.GetEnvironmentVariable("app_account_connectionString")
    ?? builder.Configuration["app-account:connectionString"]
    ?? throw new NullReferenceException(nameof(appAccountConnectionString));

string mongoConnectionString = Environment.GetEnvironmentVariable("mongo_connectionString")
    ?? builder.Configuration["mongo:connectionString"]
    ?? throw new NullReferenceException(nameof(mongoConnectionString));

string mongoDatabaseName = Environment.GetEnvironmentVariable("mongo_databaseName")
    ?? builder.Configuration["mongo:databaseName"]
    ?? throw new NullReferenceException(nameof(mongoDatabaseName));

string jwtKey = Environment.GetEnvironmentVariable("jwt_key")
    ?? builder.Configuration["jwt:jwt-key"]
    ?? throw new NullReferenceException(nameof(jwtKey));

string jwtIssuer = Environment.GetEnvironmentVariable("jwt_issuer")
    ?? builder.Configuration["jwt:issuer"]
    ?? throw new NullReferenceException(nameof(jwtIssuer));

string jwtAudience = Environment.GetEnvironmentVariable("jwt_audience")
    ?? builder.Configuration["jwt:audience"]
    ?? throw new NullReferenceException(nameof(jwtAudience));

builder.Services.AddDbContext<AppEFContext>(
        options =>
        {
            options.UseSqlServer(connectionString: appAccountConnectionString);
        }
    );

builder.Services.Configure<MongoConnectionSetting>(options =>
{
    options.ConnectionString = mongoConnectionString;
    options.DatabaseName = mongoDatabaseName;
});

builder.Services.Configure<JwtSetting>(options =>
{
    options.Key = jwtKey;
    options.Issuer = jwtIssuer;
    options.Audience = jwtAudience;
});

builder.Services.AddIdentity<AppUser, IdentityRole>().AddEntityFrameworkStores<AppEFContext>();

builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("AdminOnly", policy => policy.RequireClaim(ClaimTypes.Role, "admin"));
});

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("ECommerceAPIv1", new OpenApiInfo
    {
        Title = "ECommerceAPI",
        Description = "A set of endpoints to be used for my ecommerce site.",
        Version = "v1"
    });
});

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("EnableCORS", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    }
    );
});

var app = builder.Build();

app.UseCors("EnableCORS");

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/ECommerceAPIv1/swagger.json", "ECommerceAPIv1");
    c.DefaultModelRendering(ModelRendering.Example);
    c.DisplayRequestDuration();
    c.DocExpansion(DocExpansion.List);
    c.EnableFilter();
    c.EnableValidator();
    c.ShowCommonExtensions();
    c.ShowExtensions();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.Map("/", c => Task.Run(() => c.Response.Redirect("/swagger/index.html")));

app.Run();