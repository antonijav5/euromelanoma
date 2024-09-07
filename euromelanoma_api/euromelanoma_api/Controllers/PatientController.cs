using euromelanoma_api.Managers;
using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static euromelanoma_api.Models.DTOObjects.PatientClasses;

namespace euromelanoma_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private EUROMELANOMAContext _context;
        private IConfiguration _config;
        private PatientManager patientManager;
        public PatientController(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
            patientManager = new PatientManager(_context, _config);
        }

        [HttpPost("InsertQuestionnaire")]
        public RequestResult<bool> InsertQuestionnaireWithData(QuestionnaireDataPatientInsertModel model) { 
        
            return null; 
        }
    }
}
