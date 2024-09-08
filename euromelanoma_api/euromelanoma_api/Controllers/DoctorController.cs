using DocumentFormat.OpenXml.Wordprocessing;
using euromelanoma_api.Managers;
using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using static euromelanoma_api.Models.DTOObjects.DoctorClasses;

namespace euromelanoma_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private EUROMELANOMAContext _context;
        private IConfiguration _config;
        private DoctorManager doctorManager;
        public DoctorController(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
            doctorManager = new DoctorManager(_context, _config);
        }



[HttpPost("AddDoctorNotes")]
public RequestResult<string> AddDoctorNotes([FromBody] DoctorNotesDto dto)
        {
          return new RequestResult<string>(true, doctorManager.AddDoctorNotes(dto), "All good.");

        }
    }
    }
