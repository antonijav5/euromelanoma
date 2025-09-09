using euromelanoma_api.Models.EuromelanomaContext;
using static euromelanoma_api.Models.DTOObjects.DoctorClasses;

namespace euromelanoma_api.Managers
{
    public class DoctorManager
    {

        private EUROMELANOMAContext _context;
        private IConfiguration _config;

        public DoctorManager(EUROMELANOMAContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public string AddDoctorNotes(DoctorNotesDto dto)
        {
            if (dto == null)
            {
                return "Invalid data.";
            }

            // Map DTO to your entity model and save to database
            var doctorNotes = new doctor_notes
            {
                questionnaireID = dto.QuestionnaireID,
                patient_purpose = dto.PatientPurpose,
                family_history_melanoma = dto.FamilyHistoryMelanoma,
                family_history_non_melanoma = dto.FamilyHistoryNonMelanoma,
                personal_history_melanoma = dto.PersonalHistoryMelanoma,
                melanoma_count = dto.MelanomaCount,
                personal_history_carcinoma = dto.PersonalHistoryCarcinoma,
                bcc_count = dto.BccCount,
                scc_count = dto.SccCount,
                other_carcinoma_description = dto.OtherCarcinomaDescription,
                skin_examination_today = dto.SkinExaminationToday,
                dermoscopy_performed = dto.DermoscopyPerformed,
                nevus_count = dto.NevusCount,
                more_than_twenty_nevus_on_hands = dto.MoreThanTwentyNevusOnHands,
                atypical_nevi_presence = dto.AtypicalNeviPresence,
                atypical_nevi_count = dto.AtypicalNeviCount,
                congenital_nevi_medium_size = dto.CongenitalNeviMediumSize,
                congenital_nevi_medium_location = dto.CongenitalNeviMediumLocation,
                congenital_nevi_giant_size = dto.CongenitalNeviGiantSize,
                congenital_nevi_giant_location = dto.CongenitalNeviGiantLocation,
                solar_lentigo = dto.SolarLentigo,
                suspicious_melanoma = dto.SuspiciousMelanoma,
                suspicious_melanoma_count = dto.SuspiciousMelanomaCount,
                melanoma_detected_by = dto.MelanomaDetectedBy,
                suspicious_bcc = dto.SuspiciousBcc,
                suspicious_bcc_count = dto.SuspiciousBccCount,
                bcc_detected_by = dto.BccDetectedBy,
                suspicious_scc = dto.SuspiciousScc,
                suspicious_scc_count = dto.SuspiciousSccCount,
                scc_detected_by = dto.SccDetectedBy,
                actinic_keratosis = dto.ActinicKeratosis,
                actinic_keratosis_number = dto.ActinicKeratosisNumber,
                actinic_keratosis_count = dto.ActinicKeratosisCount,
                actinic_keratosis_detected_by = dto.ActinicKeratosisDetectedBy,
                other_lesions = dto.OtherLesions,
                other_lesions_description = dto.OtherLesionsDescription,
                hematological_decease = dto.HematologicalDecease,
                hiv_decease = dto.HivDecease,
                other_immunosuppresion = dto.OtherImmunosuppresion,
                other_immunosuppresion_reason = dto.OtherImmunosuppresionReason,
                other_deceases = dto.OtherDeceases,
                other_deceases_name = dto.OtherDeceasesName,
                smoking = dto.Smoking,
                ex_smoker = dto.ExSmoker
            };

            // Save to database
            _context.doctor_notes.Add(doctorNotes);
            var questionnaire = _context.Questionnaires.FirstOrDefault(a => a.QuestionnaireID == doctorNotes.questionnaireID);
            if (questionnaire != null) questionnaire.CompleteDate = DateTime.Now;
            var appt = _context.ScheduledAppointments
           .FirstOrDefault(a => a.PatientID == questionnaire.PatientID && a.Status == "Scheduled");
            if (appt != null) { appt.Status = "Finished"; }
            _context.SaveChanges();

            return "Doctor notes added successfully.";
        }

        public List<Users> GetPatientsForDoctor(int doctorId)
        {
            List<int> listaPacijenata = _context.Questionnaires.Where(a => a.DoctorID == doctorId).Select(b => b.PatientID).ToList();
            return _context.Users.Where(a => listaPacijenata.Contains(a.UserID)).ToList();
        }

        public List<Questionnaires> GetQuestionnairesForPatient(int patientId)
        {

            return _context.Questionnaires.Where(a => a.PatientID == patientId).ToList();
        }
        public List<QuestionnaireDataPatient> GetQuestionnairesById(int questionnaireId) => _context.QuestionnaireDataPatient.Where(a => a.questionnaireID == questionnaireId)?.ToList();
        public List<doctor_notes> GetDoctorNotesByQuestionnaireId(int questionnaireId) => _context.doctor_notes.Where(a => a.questionnaireID == questionnaireId)?.ToList();

    }
}
