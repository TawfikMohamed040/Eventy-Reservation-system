using System.Text;
using Eventy_System.Models;
using Eventy_System.Repositories.AccountRepository;
using Eventy_System.Repositories.Event;
using Eventy_System.Repositories.Reservation;
using Eventy_System.Repositories.RoleRepository;
using Eventy_System.Services.AccountService;
using Eventy_System.Services.EventService;
using Eventy_System.Services.Reservation;
using Eventy_System.Services.RoleService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.



builder.Services.AddControllers();
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IAccountRepository , AccountRepository>();
builder.Services.AddScoped<IAccountService , AccountService>();
builder.Services.AddScoped<IRoleRepository , RoleRepository>();
builder.Services.AddScoped<IRoleService , RoleService>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IReservationService, ReservationService>();


builder.Services.AddDbContext<EventContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("EventySystem"));
});

// why ? to change the default of Authentication behavior from cookie to jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme; 
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:IssuerIP"] ,
        ValidAudience = builder.Configuration["Jwt:AudienceIP"],
        IssuerSigningKey =  new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secretkey"]))
        
    };
});



builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<EventContext>();


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") 
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});




// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.MapOpenApi();
    app.MapScalarApiReference(
        o =>
        {
            o.Theme = ScalarTheme.DeepSpace;
        });
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();