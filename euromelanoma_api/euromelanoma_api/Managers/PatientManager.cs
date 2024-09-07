using euromelanoma_api.Models.EuromelanomaContext;
using System.Text;

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


        public void InsertQuestionnaireWithData(QuestionnaireDataPatient model, int patientID)
        {
           
            int score = CalculateRiskScore(model);
            // 1. Kreiranje novog Questionnaire zapisa
            var questionnaire = new Questionnaires
                {
                    PatientID = patientID,
              
                    Score = score,          // Može biti inicijalni rezultat (0)
                    CreatedAt = DateTime.Now,
                    //Consent = model.con        // Saglasnost pacijenta
                };

               // Dodajemo questionnaire zapis u bazu
                _context.Questionnaires.Add(questionnaire);
                _context.SaveChanges(); // Ovo će sačuvati novi Questionnaire i generisati QuestionnaireID

                // 2. Dobijamo novi QuestionnaireID
                int questionnaireID = questionnaire.QuestionnaireID;

                // 3. Sada unosimo podatke u QuestionnaireDataPatient, koristeći novi QuestionnaireID
                var questionnaireData = new QuestionnaireDataPatient
                {
                    questionnaireID = questionnaireID,
                    gender = model.gender,
                    birth_year = model.birth_year,
                    birth_place = model.birth_place,
                    residence = model.residence,
                    weight = model.weight,
                    height = model.height,
                    ethnicity = model.ethnicity,
                    other_ethnicity = model.other_ethnicity,
                    education_level = model.education_level,
                    living_alone = model.living_alone,
                    reason_exam = model.reason_exam,
                    full_body_check_done = model.full_body_check_done,
                    hair_color = model.hair_color,
                    how_much_freckles = model.how_much_freckles,
                    sun_reaction = model.sun_reaction,

                    // Sun exposure data
                    SunExposureFromAge0to12 = model.SunExposureFromAge0to12,
                    SunExposureFromAge13to19 = model.SunExposureFromAge13to19,
                    SunExposureFromAge20to40 = model.SunExposureFromAge20to40,
                    SunExposureFromAge40to60 = model.SunExposureFromAge40to60,
                    SunExposureFromAge60to80 = model.SunExposureFromAge60to80,
                    SunExposureAfterAge80 = model.SunExposureAfterAge80,

                    // Other fields
                    tanning_exposure = model.tanning_exposure,
                    sunny_country_exposure = model.sunny_country_exposure,
                    years_before_18 = model.years_before_18,
                    location_before_18 = model.location_before_18,
                    years_after_18 = model.years_after_18,
                    location_after_18 = model.location_after_18,

                    used_solarium = model.used_solarium,
                    total_visits = model.total_visits,
                    first_visit_age = model.first_visit_age,
                    last_visit_age = model.last_visit_age,

                    // Burns
                    had_childhood_burns = model.had_childhood_burns,
                    had_adolescence_burns = model.had_adolescence_burns,
                    had_burns_between_20_40 = model.had_burns_between_20_40,
                    had_burns_between_40_60 = model.had_burns_between_40_60,
                    had_burns_between_60_80 = model.had_burns_between_60_80,
                    had_burns_after_80 = model.had_burns_after_80
                };

            // Dodajemo podatke u QuestionnaireDataPatient tabelu
            _context.QuestionnaireDataPatient.Add(questionnaireData);
            _context.SaveChanges(); // Čuvamo sve podatke
            
        }






        public int CalculateRiskScore(QuestionnaireDataPatient model)
        {
            int score = 0;

            // 1. Provera izloženosti sunčanju (tanning exposure)
            if (model.tanning_exposure == "frequent")
            {
                score += 5; // Visok rizik zbog čestog sunčanja
            }
            else if (model.tanning_exposure == "occasional")
            {
                score += 2; // Srednji rizik
            }

            // 2. Korišćenje solarijuma
            if (model.used_solarium)
            {
                if (model.total_visits > 20)
                {
                    score += 5; // Visok rizik
                }
                else if (model.total_visits > 10)
                {
                    score += 3; // Srednji rizik
                }
                else
                {
                    score += 1; // Nizak rizik
                }
            }

            // 3. Provera opekotina (burns)
            if (model.had_childhood_burns == "yes")
            {
                score += 3; // Opekotine u detinjstvu
            }
            if (model.had_adolescence_burns == "yes")
            {
                score += 3; // Opekotine u adolescenciji
            }
            if (model.had_burns_between_20_40 == "yes")
            {
                score += 2; // Opekotine između 20-40 godina
            }
            if (model.had_burns_between_40_60 == "yes")
            {
                score += 1; // Opekotine između 40-60 godina
            }
            if (model.had_burns_between_60_80 == "yes")
            {
                score += 1; // Opekotine između 60-80 godina
            }
            if (model.had_burns_after_80 == "yes")
            {
                score += 1; // Opekotine posle 80 godina
            }

            // 4. Provera izloženosti suncu pre 18 godina
            if (model.sunny_country_exposure)
            {
                score += 4; // Veći rizik zbog boravka u sunčanim zemljama
            }

            // 5. Dodaj druge faktore na osnovu podataka
            // Ovde možeš dodati još uslova na osnovu drugih polja forme (npr. etnička pripadnost, prirodna boja kose, itd.)

            return score;
        }

    }
}
