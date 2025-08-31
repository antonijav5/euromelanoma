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


        [HttpGet("GetPatientsForDoctor/{doctorId}")]
        public RequestResult<Users> GetPatientsForDoctor(int doctorId)
        {
            var patients = doctorManager.GetPatientsForDoctor(doctorId); 
            return new RequestResult<Users>(true,patients, "All good.", null,null);
        }
        [HttpGet("GetQuestionnairesForPatient/{patientId}")]
        public RequestResult<Questionnaires> GetQuestionnairesForPatient(int patientId)
        {

            var questionnaires = doctorManager.GetQuestionnairesForPatient(patientId);
            return new RequestResult<Questionnaires>(true, questionnaires, "All good.", null, null);
        }
        [HttpGet("GetQuestionnairesById/{questionnaireId}")]
        public RequestResult<QuestionnaireDataPatient> GetQuestionnairesById(int questionnaireId)
        {

            var questionnaires = doctorManager.GetQuestionnairesById(questionnaireId); 
            return new RequestResult<QuestionnaireDataPatient>(true, questionnaires, "All good.", null, null);
        }

        [HttpGet("GetDoctorNotesByQuestionnaireId/{questionnaireId}")]
        public RequestResult<doctor_notes> GetDoctorNotesByQuestionnaireId(int questionnaireId)
        {

            var doctorNotes = doctorManager.GetDoctorNotesByQuestionnaireId(questionnaireId);
            return new RequestResult<doctor_notes>(true, doctorNotes, "All good.", null, null);
        }
    }
    }
