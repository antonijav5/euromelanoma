namespace euromelanoma_api.Models.DTOObjects
{
    public class DoctorClasses
    {

        public class DoctorNotesDto
        {
            public int QuestionnaireID { get; set; }
            public string PatientPurpose { get; set; }
            public string FamilyHistoryMelanoma { get; set; }
            public string FamilyHistoryNonMelanoma { get; set; }
            public string PersonalHistoryMelanoma { get; set; }
            public int? MelanomaCount { get; set; }
            public string PersonalHistoryCarcinoma { get; set; }
            public int? BccCount { get; set; }
            public int? SccCount { get; set; }
            public string OtherCarcinomaDescription { get; set; }
            public string SkinExaminationToday { get; set; }
            public bool DermoscopyPerformed { get; set; }
            public int NevusCount { get; set; }
            public bool MoreThanTwentyNevusOnHands { get; set; }
            public bool AtypicalNeviPresence { get; set; }
            public int? AtypicalNeviCount { get; set; }
            public bool CongenitalNeviMediumSize { get; set; }
            public string CongenitalNeviMediumLocation { get; set; }
            public bool CongenitalNeviGiantSize { get; set; }
            public string CongenitalNeviGiantLocation { get; set; }
            public bool SolarLentigo { get; set; }
            public bool SuspiciousMelanoma { get; set; }
            public int? SuspiciousMelanomaCount { get; set; }
            public string MelanomaDetectedBy { get; set; }
            public bool SuspiciousBcc { get; set; }
            public int? SuspiciousBccCount { get; set; }
            public string BccDetectedBy { get; set; }
            public bool SuspiciousScc { get; set; }
            public int? SuspiciousSccCount { get; set; }
            public string SccDetectedBy { get; set; }
            public bool ActinicKeratosis { get; set; }
            public string ActinicKeratosisNumber { get; set; }
            public int? ActinicKeratosisCount { get; set; }
            public string ActinicKeratosisDetectedBy { get; set; }
            public bool OtherLesions { get; set; }
            public string OtherLesionsDescription { get; set; }
            public bool HematologicalDecease { get; set; }
            public bool HivDecease { get; set; }
            public bool OtherImmunosuppresion { get; set; }
            public string OtherImmunosuppresionReason { get; set; }
            public bool OtherDeceases { get; set; }
            public string OtherDeceasesName { get; set; }
            public bool Smoking { get; set; }
            public bool? ExSmoker { get; set; }
        }

    }
}
