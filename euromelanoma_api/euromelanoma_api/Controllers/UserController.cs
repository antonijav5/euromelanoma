using euromelanoma_api.Managers;
using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using Microsoft.AspNetCore.Mvc;

namespace euromelanoma_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private EUROMELANOMAContext _context;
        private IConfiguration _config;
        private UserManager userManager;
        public UserController(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
            userManager = new UserManager(_context, _config);
        }

        [HttpPost("Login")]
        public async Task<RequestResult<UserModel>> Login(string username, string password)
        {
            if (username == null || password == null)
            {
                return null;
            }

            try
            {
                var user = _context.Users.Where(Users => Users.Username == username).FirstOrDefault();
                if (user == null)
                {
                    return new RequestResult<UserModel>(false, null, "Korisnik sa datim korisničkim imenom ne postoji!", null, null);
                }

                var result = await userManager.Login(username, password);

                if (result != null)
                {
                    List<UserModel> resultList = new List<UserModel>();
                    resultList.Add(result);
                    return new RequestResult<UserModel>(true, resultList, "Ok", null, null);
                }
                else
                {
                    return new RequestResult<UserModel>(false, null, "Neispravna lozinka!", null, null);
                }
            }
            catch (Exception ex)
            {
                return new RequestResult<UserModel>(false, null, "Greška: " + ex.Message, null, null);
            }
        }


        [HttpPost("CreateHash")]
        public IActionResult GetSha1Hash([FromBody] string input)
        {
            return Ok(UserManager.GetHashHex(input));

        }

        [HttpGet("GetUsers")]
        public RequestResult<Users> GetUsers()
        {
            return new RequestResult<Users>(true, userManager.GetUsers(), "All good.", null, null);
        }

        [HttpGet("GetUserRequests")]
        public RequestResult<UserRequests> GetUserRequests()
        {
            return new RequestResult<UserRequests>(true, userManager.GetUserRequests(), "All good.", null, null);
        }


        [HttpPost("ForgotPassword")]
        public RequestResult<string> ResetPassword([FromBody] PasswordResetRequestDto email)
        {
            string msg = userManager.ForgotPassword(email);
            bool success = !msg.Equals("Korisnik sa ovim email-om ne postoji.");
            return new RequestResult<string>(success, msg, "All good.");
        }


        [HttpPost("ResetPassword")]
        public RequestResult<string> ResetPassword([FromBody] ResetPasswordDto model)
        {
            return new RequestResult<string>(true, userManager.ResetPassword(model), "All good.");
        }


    }


}
