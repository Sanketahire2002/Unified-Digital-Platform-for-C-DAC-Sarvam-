using Sarvam.Data;
using Sarvam.Models;
using Sarvam.Services.ServicesInterfaces;
using System;
using System.Threading.Tasks;

namespace Sarvam.Services.ServicesImplementations
{
    public class UserCredentialsService : IUserCredentialsService
    {
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;
        private readonly CCATService _ccatService;

        public UserCredentialsService(ApplicationDbContext context, CCATService ccatService)
        {
            _context = context;
            _emailService = new EmailService();
            _ccatService = ccatService;
        }

        public async Task<string> CreateUserAsync(string email, string formNumber)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentException("Email is required.");
            }

            // Generate Unique 12-digit PRN
            long prn = GenerateUniquePRN();

            // Set the password as the same as PRN
            string password = prn.ToString();

            // Set role and status defaults
            string role = "Student"; // Default role
            string status = "Active"; // Default status

            // Set current time for CreatedAt and UpdatedAt
            DateTime currentTime = DateTime.Now;

            // Create the new User object
            UserCredentials user = new UserCredentials
            {
                PRN = prn,
                Password = password,
                Role = role,
                Status = status,
                CreatedAt = currentTime,
                UpdatedAt = currentTime
            };

            // Add the user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Update status in CCAT service
            var statusUpdateResult = await _ccatService.UpdateStatusToActive(formNumber);

            string emailBody = $@"
            <html>
                <body>
                       Welcome to our platform. Thank you for registering!<br>
                        Here are your details:<br>
                        PRN: {prn}<br>
                        Password: {password}
                </body>
            </html>";

            // Send the welcome email
            _emailService.SendEmail(
                email,
                "Welcome to Sarvam!",
                emailBody
            );

            return "User created successfully";
        }

        // Method to generate a unique 12-digit PRN
        private long GenerateUniquePRN()
        {
            Random random = new Random();
            long timestampPart = DateTime.Now.Ticks % 1000000; // Get the last 6 digits of the current timestamp
            long randomPart = random.Next(100000, 999999); // Generate a random 6-digit number

            // Concatenate timestamp and random number and ensure it is always 12 digits
            return long.Parse($"{timestampPart:D6}{randomPart}");
        }
    }
}
