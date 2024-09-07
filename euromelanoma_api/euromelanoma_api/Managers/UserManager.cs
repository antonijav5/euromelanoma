using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
                Id =user.UserID,
                Username = user.Username,
                NazivUsera = user.FirstName,
                Token = token,
                UserType=user.UserType
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
    }
}
