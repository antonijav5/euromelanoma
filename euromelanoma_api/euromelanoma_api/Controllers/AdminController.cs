using euromelanoma_api.Managers;
using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.ComponentModel.Design;
using static euromelanoma_api.Models.DTOObjects.AdminClasses;

namespace euromelanoma_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private EUROMELANOMAContext _context;
        private IConfiguration _config;
        private AdminManager adminManager;
        public AdminController(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
            adminManager = new AdminManager(_context, _config);
        }


        [HttpPost("RegisterPatient")] 
        // Obican insert u bazu. Koristice se u svakom slucaju, ili nakon odobravanja od strane admina ili pri registraciji pacijenta.
        public RequestResult<Users> RegisterPatient([FromBody] RegisterUserModel registerUserModel)
        {
            ArgumentNullException.ThrowIfNull(registerUserModel, nameof(registerUserModel));
            adminManager.RegisterUser(registerUserModel);
            return new RequestResult<Users>(true, null , "Uspeh.", null, null);

        }

        [HttpPost("RegisterDoctor"), Produces("application/json")]
        public RequestResult<Users> RegisterDoctor([FromBody] RegisterUserModel model)
        {
         
                var pass = adminManager.GeneratePassword();
                model.Password = pass;
                adminManager.RegisterUser(model);
            return new RequestResult<Users>(true, null, "Uspeh.", null, null);

        }

        [HttpPost("CreateDoctorRegisterRequest"), Produces("application/json")]
        public RequestResult<Users> CreateDoctorRegisterRequest([FromBody] RegisterUserModel model)
        {
            adminManager.CreateDoctorRegisterRequest(model);
            return new RequestResult<Users>(true, null, "Uspeh.", null, null);

        }

    }
}
