using euromelanoma_api.Models.EuromelanomaContext;
using System.Text;
using static euromelanoma_api.Models.DTOObjects.PatientClasses;

namespace euromelanoma_api.Managers
{
    public class PatientManager
    {
        private EUROMELANOMAContext _context;
        private IConfiguration _config;

        public PatientManager(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public int getFreeDoctor()
        {
            return 1;
        }
        public Questionnaires InsertQuestionnaireWithData(QuestionnaireDataPatientInsertModel model)
        {
           
            int score = CalculateRiskScore(model);
            //za sada je doctor null,dok se ne zakaze pregled
     
            var questionnaire = new Questionnaires
                {
                    PatientID = model.PatientId,
                    DoctorID=null,
                    Score = score,          
                    CreatedAt = DateTime.Now,
                    Consent = model. Consent     
                };

             
                _context.Questionnaires.Add(questionnaire);
                _context.SaveChanges(); 

                int questionnaireID = questionnaire.QuestionnaireID;

             
                var questionnaireData = new QuestionnaireDataPatient
                {
                    questionnaireID = questionnaireID,
                    gender = model.Gender,
                    birth_year = model.BirthYear,
                    birth_place = model.BirthPlace,
                    residence = model.Residence,
                    weight = model.Weight,
                    height = model.Height,
                    ethnicity = model.Ethnicity,
                    other_ethnicity = model.OtherEthnicity,
                    education_level = model.EducationLevel,
                    living_alone = model.LivingAlone,
                    reason_exam = model.ReasonForComing,
                    full_body_check_done = model.FullBodyCheck,
                    hair_color = model.HairColor,
                    how_much_freckles = model.Freckles,
                    sun_reaction = model.SunReaction,

           
                    SunExposureFromAge0to12 = model.SunExposureFromAge0to12,
                    SunExposureFromAge13to19 = model.SunExposureFromAge13to19,
                    SunExposureFromAge20to40 = model.SunExposureFromAge20to40,
                    SunExposureFromAge40to60 = model.SunExposureFromAge40to60,
                    SunExposureFromAge60to80 = model.SunExposureFromAge60to80,
                    SunExposureAfterAge80 = model.SunExposureAfterAge80,

                    tanning_exposure = model.TanningExposure,
                    sunny_country_exposure = model.SunnyCountryExposure.Exposure,
                    years_before_18 = model.SunnyCountryExposure.YearsBefore18,
                    location_before_18 = model.SunnyCountryExposure.LocationBefore18,
                    years_after_18 = model.SunnyCountryExposure.YearsAfter18,
                    location_after_18 = model.SunnyCountryExposure.LocationAfter18,

                    used_solarium = model.SolariumUse.UsedSolarium,
                    total_visits = model.SolariumUse.TotalVisits,
                    first_visit_age = model.SolariumUse.FirstVisitAge,
                    last_visit_age = model.SolariumUse.LastVisitAge,

                    had_childhood_burns = model.Sunburns.Childhood,
                    had_adolescence_burns = model.Sunburns.Adolescence,
                    had_burns_between_20_40 = model.Sunburns.Between20and40,
                    had_burns_between_40_60 = model.Sunburns.Between40and60,
                    had_burns_between_60_80 = model.Sunburns.Between60and80,
                    had_burns_after_80 = model.Sunburns.After80
                };

        
            _context.QuestionnaireDataPatient.Add(questionnaireData);
            _context.SaveChanges();
       
            return questionnaire;   
        }






        public int CalculateRiskScore(QuestionnaireDataPatientInsertModel model)
        {
            int score = 0;

            // 1. Provera izloženosti sunčanju (tanning exposure)
            if (model.TanningExposure == "frequent")
            {
                score += 5; // Visok rizik zbog čestog sunčanja
            }
            else if (model.TanningExposure == "occasional")
            {
                score += 2; // Srednji rizik
            }

            // 2. Korišćenje solarijuma
            if (model.SolariumUse.UsedSolarium=="yes")
            {
                if (model.SolariumUse.TotalVisits > 20)
                {
                    score += 5; // Visok rizik
                }
                else if (model.SolariumUse.TotalVisits > 10)
                {
                    score += 3; // Srednji rizik
                }
                else
                {
                    score += 1; // Nizak rizik
                }
            }

            // 3. Provera opekotina (burns)
            if (model.Sunburns.Childhood == "yes")
            {
                score += 3; // Opekotine u detinjstvu
            }
            if (model.Sunburns.Adolescence == "yes")
            {
                score += 3; // Opekotine u adolescenciji
            }
            if (model.Sunburns.Between20and40 == "yes")
            {
                score += 2; // Opekotine između 20-40 godina
            }
            if (model.Sunburns.Between40and60 == "yes")
            {
                score += 1; // Opekotine između 40-60 godina
            }
            if (model.Sunburns.Between60and80 == "yes")
            {
                score += 1; // Opekotine između 60-80 godina
            }
            if (model.Sunburns.After80 == "yes")
            {
                score += 1; // Opekotine posle 80 godina
            }

            // 4. Provera izloženosti suncu pre 18 godina
            if (model.SunnyCountryExposure.Exposure == "yes")
            {
                score += 4; // Veći rizik zbog boravka u sunčanim zemljama
            }

            // 5. Dodaj druge faktore na osnovu podataka
            // Ovde možeš dodati još uslova na osnovu drugih polja forme (npr. etnička pripadnost, prirodna boja kose, itd.)

            return score;
        }

        public List<ScheduledAppointments> GetAppointments(int patientId)
        {
            return _context.ScheduledAppointments.Where(a => a.PatientID == patientId).ToList();
        }

        public List<SchedulePatientAppointmentResult> ScheduleAppointment(int PatientId, string PhoneNumber, int CityID) {
        return _context.Procedures.SchedulePatientAppointmentAsync(PatientId, PhoneNumber, CityID).Result;
        }

        public List<Cities> GetAvaliableCities ()
        {
            var cities = new List<Cities>();
            var slots = _context.AvailableSlots.Where(a => a.StartTime > DateTime.Now).Select(a => a.CityID).ToList().Distinct();
            foreach (var item in slots)
            {
               cities.Add(_context.Cities.Where(a => a.CityID == item).ToList().FirstOrDefault());   
            }

            return cities;

        }

    }
}
