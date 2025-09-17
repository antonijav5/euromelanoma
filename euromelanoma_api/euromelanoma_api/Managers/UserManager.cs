using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace euromelanoma_api.Managers
{
    public class UserManager
    {

        private EUROMELANOMAContext _context;
        private IConfiguration _config;

        private static readonly Encoding Encoding1252 = Encoding.GetEncoding(1252);

        public UserManager(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<UserModel> Login(string username, string password)
        {
            var user = _context.Users.Where(Users => Users.Username == username).FirstOrDefault();

            string new_hash = GetHashHex(password);
            string binary_old = BitConverter.ToString(user.PasswordHash).Replace("-", "").ToLower();
            if (new_hash != binary_old) { return null; }

            string token = GenerateToken(user);
            return new UserModel
            {
                Id = user.UserID,
                Username = user.Username,
                NazivUsera = user.FirstName,
                Token = token,
                UserType = user.UserType
            };
        }


        public static byte[] SHA1HashValue(string s)
        {
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
            var enc1252 = Encoding.GetEncoding(1252);
            byte[] bytes = enc1252.GetBytes(s);

            var sha1 = SHA512.Create();
            byte[] hashBytes = sha1.ComputeHash(bytes);

            return hashBytes;
        }

        public string GenerateToken(Users user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
          new Claim(ClaimTypes.Name, user.Username),
          new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString())
      };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddMinutes(15),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string GetHashHex(string input)
        {
            byte[] hashBytes = UserManager.SHA1HashValue(input);
            string hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

            return hashString;
        }

        public List<Users> GetUsers()
        {
            return _context.Users.ToList();
        }

        public List<UserRequests> GetUserRequests()
        {
            return _context.UserRequests.ToList();
        }


        public string Reset(string username, string oldPassword, string newPassword)
        {

            var staraSifra = _context.Users.Where(x => x.Username == username).FirstOrDefault().PasswordHash;

            byte[] passwordBytes = SHA1HashValue(oldPassword);

            if (staraSifra.SequenceEqual(passwordBytes))
            {
                //return await _context.Procedures.PRAVA_ResetUserPasswordAsync(username, oldPassword, newPassword);
                var hex = UserManager.GetHashHex(newPassword);
                byte[] bytes = new byte[hex.Length / 2];
                for (int i = 0; i < hex.Length; i += 2)
                {
                    bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
                }

                Users u = _context.Users.Where(a => a.Username == username).FirstOrDefault();
                u.PasswordHash = bytes;
                _context.Update(u);
                _context.SaveChanges();
                return "Ok";
            }
            else
            {
                return null;
            }
        }


        public void SendEmailReset(string link, string emailAdresa)
        {

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
                         <div class=""header""> Kliknite <a href='{link}'>ovde</a> da biste izmenili svoju lozinku.
       
                     </div>
                 </body>
                 </html>";


            var sendGridApiKey = _config["SendGrid:ApiKey"];
            var sendGridClient = new SendGridClient(sendGridApiKey);
            var from = new EmailAddress("portaleuromelanoma@gmail.com", "Euromelanoma Portal");
            var subject = "Link za promenu lozinke na Euromelanoma portal-u";
            var to = new EmailAddress(emailAdresa);
            var plainContent = "Pozdrav.";
            var htmlContent = messageSubject;
            var mailMessage = MailHelper.CreateSingleEmail(from, to, subject, plainContent, htmlContent);
            sendGridClient.SendEmailAsync(mailMessage);

        }


        public string ForgotPassword([FromBody] PasswordResetRequestDto email)
        {
            var user = _context.Users.Where(u => u.Email == email.Email)?.FirstOrDefault();

            if (user == null)
            {
                return "Korisnik sa ovom e-mail adresom ne postoji.";
            }

            var token = GeneratePasswordResetToken();

            var passwordReset = new PasswordResetTokens
            {
                UserId = user.UserID,
                Token = token,
                ExpiryDate = DateTime.Now.AddHours(1)
            };

            _context.PasswordResetTokens.Add(passwordReset);
            _context.SaveChanges();

            SendEmailReset($"http://localhost:4200/reset-password/{token}", user.Email);

            return "Email sa uputstvima za resetovanje lozinke je poslat.";
        }

        public string GeneratePasswordResetToken()
        {
            return Guid.NewGuid().ToString();
        }



        public string ResetPassword(ResetPasswordDto model)
        {
            // Pronađi token u bazi
            var passwordResetToken = _context.PasswordResetTokens
                .Where(t => t.Token == model.Token && t.ExpiryDate > DateTime.Now).FirstOrDefault();

            if (passwordResetToken == null)
            {
                return ("Token je nevažeći ili je istekao.");
            }

            // Pronađi korisnika
            var user = _context.Users.Where(u => u.UserID == passwordResetToken.UserId).FirstOrDefault();

            if (user == null)
            {
                return "Korisnik ne postoji.";
            }


            var hex = UserManager.GetHashHex(model.NewPassword);
            byte[] bytes = new byte[hex.Length / 2];
            for (int i = 0; i < hex.Length; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }

            user.PasswordHash = bytes;

            _context.Users.Update(user);
            _context.SaveChanges();

            // Obriši token nakon uspešnog resetovanja lozinke
            _context.PasswordResetTokens.Remove(passwordResetToken);
            _context.SaveChanges();

            return "Lozinka je uspešno resetovana.";
        }



    }
}
