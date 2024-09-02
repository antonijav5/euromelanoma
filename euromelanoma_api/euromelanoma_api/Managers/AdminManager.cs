using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using MailKit.Security;
using MimeKit;
using SendGrid.Helpers.Mail;
using SendGrid;
using System.Net;
using System.Net.Mail;
using System.Text;
using static euromelanoma_api.Models.DTOObjects.AdminClasses;
using Org.BouncyCastle.Utilities.Encoders;
using Microsoft.AspNetCore.Http.HttpResults;

namespace euromelanoma_api.Managers
{
    public class AdminManager
    {

        private EUROMELANOMAContext _context;
        private IConfiguration _config;

        private static readonly Encoding Encoding1252 = Encoding.GetEncoding(1252);

        public AdminManager(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public void RegisterUser(RegisterUserModel model) {
            var hex = UserManager.GetHashHex(model.Password);
            byte[] bytes = new byte[hex.Length / 2];
            for (int i = 0; i < hex.Length; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }
            Users newUser = new Users
                {
                  Username=model.Username,
                  FirstName=model.FirstName,
                  LastName=model.LastName,
                  Email=model.Email,
                  UserType=model.UserType,
                  PasswordHash=bytes
                };
            try { 
                _context.Users.Add(newUser);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message); 
            }  
            if (model.UserType == "Doctor")
            {
                var email = new MimeMessage();
                var builder = new BodyBuilder();
                // SLANJE MEJLA
                email.From.Add(new MailboxAddress("Dobijanje privremene lozinke za prijavu na Euromelanoma Portal", "euromelanomaportal@gmail.com"));
                email.To.Add(new MailboxAddress("Antonija Vasiljevic", "euromelanomaportal@gmail.com"));
                email.Subject = "Dobijanje privremene lozinke za prijavu na sistem";

                var fields = new List<string>();

                var messageSubject = $@"
                 <!DOCTYPE html>
                 <html>
                 <head>
                     <meta charset=""utf-8"">
                     <title>Nova privremena lozinka</title>
                     <style>
                         body {{ font-family: Arial, sans-serif; margin: 0; padding: 0; color: #333; }}
                         .container {{ max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }}
                         .header {{ font-size: 24px; color: #444; margin-bottom: 20px; }}
                         .content {{ font-size: 16px; line-height: 1.6; }}
                         .field {{ margin-bottom: 10px; }}
                         .label {{ font-weight: bold; }}
                         .footer {{ margin-top: 30px; text-align: center; font-size: 14px; color: #666; }}
                     </style>
                 </head>
                 <body>
                     <div class=""container"">
                         <div class=""header"">Generisanje privremene lozinke za novog korisnika sistema</b></div>
               Vaša nova privremena lozinka je {model.Password}. Ulogujte se i izmenite je u što kraćem roku.
       
                     </div>
                 </body>
                 </html>";



                var sendGridClient = new SendGridClient("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");
                var from = new EmailAddress("euromelanomaportal@gmail.com", "Euromelanoma Portal");
                var subject = "Dobijanje privremene lozinke za prijavu na sistem";
                var to = new EmailAddress("euromelanomaportal@gmail.com");
                var plainContent = "Pozdrav.";
                var htmlContent = messageSubject;
                var mailMessage = MailHelper.CreateSingleEmail(from, to, subject, plainContent, htmlContent);
                 sendGridClient.SendEmailAsync(mailMessage);
            }

  
        }





        public string GeneratePassword(int length = 8)
        {
            if (length < 8)
            {
                throw new ArgumentException("Password length must be at least 8 characters.");
            }

            // Definisanje karaktera za svaku kategoriju
            const string lowerCase = "abcdefghijklmnopqrstuvwxyz";
            const string upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string numbers = "0123456789";
            const string specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

            // Generisanje po jednog karaktera iz svake kategorije
            Random random = new Random();
            StringBuilder password = new StringBuilder();
            password.Append(lowerCase[random.Next(lowerCase.Length)]);
            password.Append(upperCase[random.Next(upperCase.Length)]);
            password.Append(numbers[random.Next(numbers.Length)]);
            password.Append(specialChars[random.Next(specialChars.Length)]);

            // Kombinovanje svih karaktera i generisanje ostatka lozinke
            string allChars = lowerCase + upperCase + numbers + specialChars;
            for (int i = password.Length; i < length; i++)
            {
                password.Append(allChars[random.Next(allChars.Length)]);
            }

            // Mešanje karaktera da bi se izbegla predvidljivost
            return new string(password.ToString().OrderBy(_ => random.Next()).ToArray());
        }

        public List<UserRequests> CreateDoctorRegisterRequest (RegisterUserModel model)
        {
            UserRequests req = new UserRequests
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Username = model.Username,
                Status="Pending"

            };
            _context.Add(req);
            _context.SaveChanges();
            return _context.UserRequests.ToList();
        }
    }
    }
