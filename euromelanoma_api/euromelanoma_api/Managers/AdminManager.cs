
using euromelanoma_api.Models.EuromelanomaContext;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Text;
using static euromelanoma_api.Models.DTOObjects.AdminClasses;

namespace euromelanoma_api.Managers
{
    public class AdminManager
    {

        private EUROMELANOMAContext _context;
        private IConfiguration _config;


        public AdminManager(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public void RegisterUser(RegisterUserModel model)
        {
            var hex = UserManager.GetHashHex(model.Password);
            byte[] bytes = new byte[hex.Length / 2];
            for (int i = 0; i < hex.Length; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }
            Users newUser = new Users
            {
                Username = model.Username,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                UserType = model.UserType,
                PasswordHash = bytes
            };
            try
            {
                _context.Users.Add(newUser);
                _context.SaveChanges();


                if (model.UserType == "Doctor")
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
                         <div class=""header"">Generisanje privremene lozinke za novog korisnika sistema sa korisničkim imenom: {model.Username}.</b></div>
               Vaša nova privremena lozinka je {model.Password}. Izmenite je u što kraćem roku.
       
                     </div>
                 </body>
                 </html>";


                    var sendGridApiKey = _config["SendGrid:ApiKey"];
                    var sendGridClient = new SendGridClient(sendGridApiKey);
                    var from = new EmailAddress("portaleuromelanoma@gmail.com", "Euromelanoma Portal");
                    var subject = "Dobijanje privremene lozinke za prijavu na sistem";
                    var to = new EmailAddress(model.Email);
                    var plainContent = "Pozdrav.";
                    var htmlContent = messageSubject;
                    var mailMessage = MailHelper.CreateSingleEmail(from, to, subject, plainContent, htmlContent);
                    sendGridClient.SendEmailAsync(mailMessage);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.InnerException.Message);
            }



        }





        public string GeneratePassword(int length = 8)
        {
            if (length < 8)
            {
                throw new ArgumentException("Password length must be at least 8 characters.");
            }

            const string lowerCase = "abcdefghijklmnopqrstuvwxyz";
            const string upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string numbers = "0123456789";
            const string specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/";

            Random random = new Random();
            StringBuilder password = new StringBuilder();
            password.Append(lowerCase[random.Next(lowerCase.Length)]);
            password.Append(upperCase[random.Next(upperCase.Length)]);
            password.Append(numbers[random.Next(numbers.Length)]);
            password.Append(specialChars[random.Next(specialChars.Length)]);


            string allChars = lowerCase + upperCase + numbers + specialChars;
            for (int i = password.Length; i < length; i++)
            {
                password.Append(allChars[random.Next(allChars.Length)]);
            }

            return new string(password.ToString().OrderBy(_ => random.Next()).ToArray());
        }

        public List<UserRequests> CreateDoctorRegisterRequest(RegisterUserModel model)
        {
            UserRequests req = new UserRequests
            {
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Username = model.Username,
                Status = "Pending"

            };
            _context.Add(req);
            _context.SaveChanges();
            return _context.UserRequests.ToList();
        }

        public string AddAppointment(AppointmentDto appointmentDto)
        {
            var appointment = new AvailableSlots
            {
                DoctorID = appointmentDto.DoctorId,
                CityID = appointmentDto.CityId,
                StartTime = appointmentDto.StartTime,
                EndTime = appointmentDto.EndTime,
                MaxPatients = appointmentDto.MaxPatients
            };

            _context.AvailableSlots.Add(appointment);
            _context.SaveChanges();
            return "Ok";
        }

        public string deleteRequest(int reqId)
        {
            UserRequests req = _context.UserRequests.Where(a => a.UserID == reqId).FirstOrDefault();
            _context.UserRequests.Remove(req);
            _context.SaveChanges();

            return "All good.";

        }
        public List<ScheduledAppointments> GetAllAppointments()
        {
            return _context.ScheduledAppointments.ToList();
        }

        public List<AvailableSlots> GetAvailableSlotsForCity(int cityId)
        {
            var result = _context.AvailableSlots
                .Where(s => s.CityID == cityId && s.StartTime > DateTime.Now)
                .GroupJoin(
                    _context.ScheduledAppointments,
                    s => s.SlotID,
                    a => a.SlotID,
                    (s, appts) => new { Slot = s, BookedCount = appts.Count() }
                )
                .Where(x => x.BookedCount < x.Slot.MaxPatients)
                .Select(x => x.Slot)
                .ToList();

            return result;
        }
    }
}
