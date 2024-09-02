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


        [HttpPost("RegisterUser")] 
        // Obican insert u bazu. Koristice se u svakom slucaju, ili nakon odobravanja od strane admina ili pri registraciji pacijenta.
        public RequestResult<Users>RegisterUser(RegisterUserModel registerUserModel)
        {
            ArgumentNullException.ThrowIfNull(registerUserModel, nameof(registerUserModel));
            adminManager.RegisterUser(registerUserModel);
            return new RequestResult<Users>(true, null , "Korisnik sa datim korisničkim imenom ne postoji!", null, null);

        }

        [HttpPost("RegistracijaLekara"), Produces("application/json")]
        public async Task<IActionResult> RegistracijaLekara(RegisterUserModel model)
        {
            try
            {
                var pass = adminManager.GeneratePassword();
                model.Password = pass;
                adminManager.RegisterUser(model);
                return Ok("uspesno");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
