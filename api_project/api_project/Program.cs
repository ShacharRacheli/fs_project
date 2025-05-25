using Comp.API.Jobs;
using Comp.Core;
using Comp.Core.IRepositories;
using Comp.Core.IServices;
using Comp.Data;
using Comp.Data.Reposirories;
using Comp.Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT Token",
        Type = SecuritySchemeType.Http
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
{
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
});
});
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();
builder.Services.AddScoped<IChallengeRepository, ChallengeRepository>();
builder.Services.AddScoped<IVoteRepository, VoteRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IVoteService, VoteService>();
builder.Services.AddScoped<IChallengeService, ChallengeService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IS3Service, S3Service>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IOpenAiService, OpenAiService>();
builder.Services.AddHostedService<ChallengeExpirationJob>();
builder.Services.AddDbContext<DataContext>(options =>
options.UseMySql(Environment.GetEnvironmentVariable("DATABASE_CONECTION"),
new MySqlServerVersion(new Version(8, 0, 41))));

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
        //ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
        //ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")))
    };
});
builder.Services.AddCors();
//ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER"),
//ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE"),
//IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")))

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAllOrigins",
//        builder =>
//        {
//            builder.AllowAnyOrigin()
//                   .AllowAnyMethod()
//                   .AllowAnyHeader();
//        });
//});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
//app.UseCors("AllowAllOrigins");
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
//        }
//    }
//}
