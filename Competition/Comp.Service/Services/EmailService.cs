﻿using Comp.Core.IServices;
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
        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                using var smtp = new SmtpClient("smtp.your-email.com")
                {
                    Port = 587,
                    Credentials = new System.Net.NetworkCredential("your-email@example.com", "your-password"),
                    EnableSsl = true
                };

                var mail = new MailMessage
                {
                    From = new MailAddress("r0583237001@gmail.com"),
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
