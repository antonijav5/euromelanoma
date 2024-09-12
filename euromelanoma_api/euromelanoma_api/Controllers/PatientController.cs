using euromelanoma_api.Managers;
using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        public RequestResult<Questionnaires> InsertQuestionnaireWithData(QuestionnaireDataPatientInsertModel model) {

            return new RequestResult<Questionnaires>(true, patientManager.InsertQuestionnaireWithData(model), "Ok");  
        }


        [HttpGet("GetAppointments/{id}")]
        public RequestResult<ScheduledAppointments> GetAppointments([FromRoute] int id)
        {
            return new RequestResult<ScheduledAppointments>(true, patientManager.GetAppointments(id), "All good.", null, null);
        }


        [HttpGet("GetAvaliableCities")]
        public RequestResult<List<Cities>> GetAvaliableCities()
        {
            var cities = new List<Cities>();
            cities = patientManager.GetAvaliableCities();
            return new RequestResult<List<Cities>>(true, cities, "All good.");
        }

        [HttpPost("ScheduleAppointment")]
        public RequestResult<SchedulePatientAppointmentResult> ScheduleAppointment([FromBody] ScheduleAppointmentRequest request)
        {
            // Pozivamo servis za zakazivanje
           SchedulePatientAppointmentResult response =  patientManager.ScheduleAppointment(
                request.PatientId,
                request.PhoneNumber,
                request.CityId
     ).FirstOrDefault();
         
            // Vraćamo poruku korisniku na osnovu odgovora iz baze
       return new RequestResult<SchedulePatientAppointmentResult> ( response.Status==1, response, response.Poruka );
        }
    }


}
