using ClosedXML.Excel;
using euromelanoma_api.Managers;
using euromelanoma_api.Models.DTOObjects;
using euromelanoma_api.Models.EuromelanomaContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.ComponentModel.Design;
using System.Reflection;
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

        [HttpPost, Produces("application/json")]
        public RequestResult<Users> CreateDoctorRegisterRequest([FromBody] RegisterUserModel model)
        {
            adminManager.CreateDoctorRegisterRequest(model);
            return new RequestResult<Users>(true, null, "Uspeh.", null, null);

        }

        [HttpPost("AddAppointment")]
        public RequestResult<string> AddAppointment([FromBody] AppointmentDto appointmentDto)
        {
   
            return new RequestResult<string>(true,adminManager.AddAppointment(appointmentDto), "Sve ok");
       
        }

        [HttpGet("GetDoctors")]
        public RequestResult<List<Users>> GetDoctors()
        {
            var list = _context.Users.Where(a => a.UserType == "Doctor").ToList();
            return new RequestResult<List<Users>>(true, list, "Sve ok");

        }

        [HttpGet("GetCities")]
        public RequestResult<List<Cities>> GetCities()
        {
            var list = _context.Cities.ToList();
            return new RequestResult<List<Cities>>(true, list, "Sve ok");

        }

        [HttpGet("GetPatients")]
        public RequestResult<List<Users>> GetPatients()
        {
            var list = _context.Users.Where(a=>a.UserType=="Patient").ToList(); // Preuzmite pacijente iz baze
            return new RequestResult<List<Users>>(true, list, "Sve ok");
        }


        [HttpGet("GetQuestionnairesByPatient/{patientId}")]
        public RequestResult<List<Questionnaires>> GetQuestionnairesByPatient(int patientId)
        {
            var list = _context.Questionnaires.Where(a=>a.PatientID==patientId).ToList(); // Preuzmite pacijente iz baze
            return new RequestResult<List<Questionnaires>>(true, list, "Sve ok");
        }

        [HttpPost("ExportExcel")]
        public IActionResult ExportExcel()
        {
            dynamic tabelaZaExcel = _context.QuestionnaireDataPatient.ToList();

            string nazivFajla = "Questionnaires" + DateTime.Now.ToString().Replace("/","_");

 
            using XLWorkbook wb = new();

            wb.AddWorksheet("Questionnaires");

            // Dobijanje referenci na radni list.
            IXLWorksheet? ws = wb.Worksheet("Questionnaires");

            // Ubacivanje tabele podataka u Excel radni list.
            ws.Cell(1, 1).InsertTable(tabelaZaExcel);

            // Inicijalizacija properties niza za čuvanje informacija o kolonama.
            PropertyInfo[] properties = typeof(string).GetProperties();

            // Dobijanje naziva izveštaja.
            properties = typeof(QuestionnaireDataPatient).GetProperties();
             
            // Inicijalizacija liste za čuvanje headera tabele.
            List<string> lHederTabele = [];

            // Inicijalizacija broja kolona u headeru tabele.
            int brojKolonaUHederu = 0;

            // Iteriranje kroz properties.
            foreach (PropertyInfo? item in properties)
            {
                // Postavljanje broja kolona u headeru.
                brojKolonaUHederu = properties.Length;

            }
            // Inicijalizacija stringa za čuvanje naziva kolone.
            string nazivKolone = string.Empty;

            // Inicijalizacija brojača.
            int brojac = 1;

            // Iteriranje kroz listu headera.
            foreach (string item in lHederTabele)
            {
                // Postavljanje naziva kolone.
                nazivKolone = item;

                // Postavljanje vrednosti ćelije u radnom listu.
                ws.Cell(1, brojac).Value = nazivKolone;

                // Inkrementiranje brojača.
                brojac++;
            }

            // Inicijalizacija memorije za čuvanje Excel fajla.
            using MemoryStream stream = new();

            // Čuvanje workbook-a u memoriju.
            wb.SaveAs(stream);

            // Vraćanje Excel fajla.
            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", nazivFajla);
        }


    }
}
