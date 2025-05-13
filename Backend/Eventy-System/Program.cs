using Eventy_System.Models;
using Eventy_System.Repositories.AccountRepository;
using Eventy_System.Repositories.Event;
using Eventy_System.Services.AccountService;
using Eventy_System.Services.EventService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IAccountRepository , AccountRepository>();
builder.Services.AddScoped<IAccountService , AccountService>();

builder.Services.AddDbContext<EventContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("EventySystem"));
});

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<EventContext>();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); 
    // app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();