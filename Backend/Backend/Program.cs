using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// --- Add CORS service ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Allow only the React frontend
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// --- Add Services to the Container ---
// Add Controller services
builder.Services.AddControllers();

// Configure Database context (SQL Server)
builder.Services.AddDbContext<AuctionDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add JWT Authentication service
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("qFz2$8(1hP]9u7LJz6+K$2hG2v7b1mB!wG6#R@j*U0pH")), // Move to appsettings.json for security
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

// Add Authorization services
builder.Services.AddAuthorization();

// Add Swagger for API documentation
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- Configure the HTTP request pipeline ---
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();  // Show detailed error page in development
    app.UseSwagger();                 // Enable Swagger in development
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend V1"));
}

// Enable CORS for the frontend
app.UseCors("AllowLocalhost3000");

// Enable Authentication & Authorization Middleware
app.UseAuthentication();  // Authentication must come before Authorization
app.UseAuthorization();

// Use Routing and Map Controllers
app.UseRouting();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();  // Map all controllers
});

app.Run();
