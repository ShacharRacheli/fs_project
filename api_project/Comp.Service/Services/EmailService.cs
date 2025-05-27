using Comp.Core.IServices;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Comp.Service.Services
{
   public class EmailService:IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                var smtpServer = Environment.GetEnvironmentVariable("SMTP_SERVER");
                var port = int.Parse(Environment.GetEnvironmentVariable("EMAIL_PORT"));
                var senderEmail = Environment.GetEnvironmentVariable("SENDER_EMAIL");
                var senderPassword = Environment.GetEnvironmentVariable("SENDER_PASSWORD");

                using var smtp = new SmtpClient(Environment.GetEnvironmentVariable("SMTP_SERVER"))
                {
                    Port = 587,
                    Credentials = new System.Net.NetworkCredential(senderEmail, senderPassword),
                    EnableSsl = true
                };
                var mail = new MailMessage
                {
                    From = new MailAddress(senderEmail),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                mail.To.Add(to);
                await smtp.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }
    }
}
