namespace euromelanoma_api.Models.DTOObjects
{
    public class PatientClasses
    {
        public class QuestionnaireDataPatientInsertModel
        {
            public int PatientId { get; set; }
            public DateTime? Date { get; set; }
            public bool Consent { get; set; }
            public string Gender { get; set; }
            public int BirthYear { get; set; }
            public string BirthPlace { get; set; }
            public string Residence { get; set; }
            public decimal Weight { get; set; }
            public decimal Height { get; set; }
            public string Ethnicity { get; set; }
            public string OtherEthnicity { get; set; }
            public string EducationLevel { get; set; }
            public bool LivingAlone { get; set; }
            public string ReasonForComing { get; set; }
            public bool FullBodyCheck { get; set; }
            public string HairColor { get; set; }
            public string Freckles { get; set; }
            public string SunReaction { get; set; }

            // Dodatna polja za sunčanje i opekotine
            public string TanningExposure { get; set; }
            public SunnyCountryExposure SunnyCountryExposure { get; set; }
            public SolariumUse SolariumUse { get; set; }
            public Sunburns Sunburns { get; set; }


        }

        public class SunnyCountryExposure
        {
            public bool Exposure { get; set; }
            public int? YearsBefore18 { get; set; }
            public string LocationBefore18 { get; set; }
            public int? YearsAfter18 { get; set; }
            public string LocationAfter18 { get; set; }
        }

        public class SolariumUse
        {
            public bool UsedSolarium { get; set; }
            public int? TotalVisits { get; set; }
            public int? FirstVisitAge { get; set; }
            public int? LastVisitAge { get; set; }
        }

        public class Sunburns
        {
            public string Childhood { get; set; }
            public string Adolescence { get; set; }
            public string Between20and40 { get; set; }
            public string Between40and60 { get; set; }
            public string Between60and80 { get; set; }
            public string After80 { get; set; }
        }
    }
}
