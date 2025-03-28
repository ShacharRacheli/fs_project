﻿using Comp.Core.IServices;
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
                //var smtpServer = _configuration["EmailSettings:SmtpServer"];
                var port = int.Parse(Environment.GetEnvironmentVariable("EMAIL_PORT"));
                //var port = int.Parse(_configuration["EmailSettings:Port"]);
                var senderEmail = Environment.GetEnvironmentVariable("SENDER_EMAIL");
                //var senderEmail = _configuration["EmailSettings:SenderEmail"];
                var senderPassword = Environment.GetEnvironmentVariable("SENDER_PASSWORD");
                //var senderPassword = _configuration["EmailSettings:SenderPassword"];

                using var smtp = new SmtpClient(Environment.GetEnvironmentVariable("SMTP_SERVER"))
                //using var smtp = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new System.Net.NetworkCredential(senderEmail, senderPassword),
                    //Credentials = new System.Net.NetworkCredential("@gmail.com", ""),
                    EnableSsl = true
                };
                var mail = new MailMessage
                {
                    From = new MailAddress(senderEmail),
                    //From = new MailAddress("@gmail.com"),
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
