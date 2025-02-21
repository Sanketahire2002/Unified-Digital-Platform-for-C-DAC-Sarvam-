using Microsoft.EntityFrameworkCore;
using Sarvam.Data;
using Sarvam.Repository.RepositoryImplementations;
using Sarvam.Repository.RepositoryInterfaces;
using Sarvam.Services.ServicesImplementations;
using Sarvam.Services.ServicesInterfaces;
using Sarvam.Service;
using Sarvam.Service.ServicesImplementations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Sarvam.Repositories;
using Sarvam.Services;
using Sarvam.Repository;

var builder = WebApplication.CreateBuilder(args);

/*// Configure database connection
var connectionString = "server=localhost;port=3306;database=sarvam_data;user=root;password=root;";
builder.Services.AddDbContext<SarvamContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddDbContext<SarvamDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
*/
builder.Services.AddDbContext<SarvamContext>(options =>
     options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 33))
    )
);

// Add DbContext for MySQL
builder.Services.AddDbContext<SyllabusDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 30)) // Replace with your MySQL version
    )
);

builder.Services.AddDbContext<SarvamDbContext>(options =>
     options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 33))
    )
);

// Register the DbContext
builder.Services.AddDbContext<ContextSarvam>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 33))
    )
);

// Register ApplicationDbContext for the UserCredentials service
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 33)))  // Adjust version if needed
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder.WithOrigins("http://localhost:5173") // Frontend URL
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

builder.Services.AddDbContext<SarvamDbLoginContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 26)))); // Replace version with your MySQL version


// Add services to the DI container
builder.Services.AddScoped<IMasterProfileRepository, MasterProfileRepository>();
builder.Services.AddScoped<IMasterProfileService, MasterProfileService>();

builder.Services.AddScoped<IMasterAttendanceRepository, MasterAttendanceRepository>();
builder.Services.AddScoped<IMasterAttendanceService, MasterAttendanceService>();

// Add services to the DI container
builder.Services.AddScoped<IMasterLeaveRequestRepository, MasterLeaveRequestRepository>();
builder.Services.AddScoped<IMasterLeaveRequestService, MasterLeaveRequestService>(); // Make sure this line is present

builder.Services.AddScoped<CCATService>(); // Registering CCATService
builder.Services.AddScoped<IUserCredentialsService, UserCredentialsService>(); // Registering IUserCredentialsService
builder.Services.AddScoped<IUserCredentialsRepository, UserCredentialsRepository>(); // Registering IUserCredentialsRepository

// Register custom services
builder.Services.AddScoped<IMasterModuleRepository, MasterModuleRepository>();
builder.Services.AddScoped<IMasterModuleService, MasterModuleService>();
builder.Services.AddScoped<IMasterModuleSubpointRepository, MasterModuleSubpointRepository>();
builder.Services.AddScoped<IMasterModuleSubpointService, MasterModuleSubpointService>();
builder.Services.AddScoped<IMasterProfileRepository, MasterProfileRepository>();
builder.Services.AddScoped<IMasterProfileService, MasterProfileService>();

builder.Services.AddScoped<IMasterResultRepository, MasterResultRepository>();
builder.Services.AddScoped<IMasterResultService, MasterResultService>();

// Register Repository and Service
builder.Services.AddScoped<IQuestionService, QuestionService>();

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IQuizService, QuizService>();
builder.Services.AddScoped<IQuizRepository, QuizRepository>();

builder.Services.AddDistributedMemoryCache(); // For storing session data in memory
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Session timeout
    options.Cookie.HttpOnly = true; // Ensure the session cookie is accessible only via HTTP
    options.Cookie.IsEssential = true; // Makes session cookie essential
});
builder.Services.AddHttpContextAccessor();
SessionHelper.Configure(builder.Services.BuildServiceProvider().GetService<IHttpContextAccessor>());
// Set up the connections to the database
using (var scope = builder.Services.BuildServiceProvider().CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<SarvamDbLoginContext>();
    try
    {
        // Test if the DbContext can connect to the database
        if (dbContext.Database.CanConnect())
        {
            Console.WriteLine("Database connection successful.");
        }
        else
        {
            Console.WriteLine("Failed to connect to the database.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine("Database connection failed: " + ex.Message);
    }
}

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
        ValidIssuer = "your-issuer",
        ValidAudience = "your-audience",
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("a-very-long-and-secure-key-that-is-at-least-32-characters-long"))
    };
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            var userPRN = SessionHelper.GetSession("UserPRN");
            var userRole = SessionHelper.GetSession("UserRole");
            var userToken = SessionHelper.GetSession("UserToken");
            Console.WriteLine($"PRN: {userPRN}, Role: {userRole}, Token: {userToken}");
            var bearerToken = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            Console.WriteLine($"Raw Bearer Token: {bearerToken}");

            // Access claims if needed
            var claims = context.Principal?.Claims;
            foreach (var claim in claims)
            {
                Console.WriteLine($"Claim: {claim.Type} = {claim.Value}");
            }

            /*if (bearerToken == userToken) Console.WriteLine("\n");
            else {
                // Customize the response for unauthorized access
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                var response = new
                {
                    message = "Unauthorized: Invalid token"
                };
                return context.Response.WriteAsync(JsonConvert.SerializeObject(response));
            };*/
            Console.WriteLine("Token validated successfully.");
            return Task.CompletedTask;
        },
        // Custom error handling for unauthorized access
        OnChallenge = context =>
        {
            // Customize the response for unauthorized access
            context.Response.StatusCode = 401;
            context.Response.ContentType = "application/json";
            var response = new
            {
                message = "Unauthorized: Invalid token"
            };
            return context.Response.WriteAsync(JsonConvert.SerializeObject(response));
        }
    };
});

builder.Services.AddControllers();

var app = builder.Build();

// Use CORS
app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline
app.UseHttpsRedirection();
app.UseRouting();
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run("http://localhost:5000");
