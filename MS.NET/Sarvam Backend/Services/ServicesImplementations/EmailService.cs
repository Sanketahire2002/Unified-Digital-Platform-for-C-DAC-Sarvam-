using System;
using System.Net;
using System.Net.Mail;

namespace Sarvam.Services.ServicesImplementations
{
    public class EmailService
    {
        private readonly string _fromMail = "sanketahire2002@gmail.com"; // Replace with your email
        private readonly string _fromPassword = "rmirrpxvgpfouveh"; // Replace with your app-specific password

        public void SendEmail(string toEmail, string subject, string body)
        {
            try
            {
                // Set up the mail message
                MailMessage message = new MailMessage
                {
                    From = new MailAddress(_fromMail),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                // Add recipient
                message.To.Add(new MailAddress(toEmail));

                // Configure SMTP client
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(_fromMail, _fromPassword),
                    EnableSsl = true,
                };

                // Send the email
                smtpClient.Send(message);
                Console.WriteLine("Email sent successfully.");
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                Console.WriteLine($"Error sending email: {ex.Message}");
                throw;
            }
        }
    }
}
