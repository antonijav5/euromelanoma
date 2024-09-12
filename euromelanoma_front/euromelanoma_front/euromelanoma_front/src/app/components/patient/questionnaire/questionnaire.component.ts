import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { ExaminationResultsComponent } from '../examination-results/examination-results.component';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css'
})
export class QuestionnaireComponent implements OnInit{
questionnaireFormStart: any;
questionnaireFormEnd: any;
questionnaireFormDoctor: any;
currentPage: number = 1; // Trenutna stranica
totalPages: number = 13; // Ukupan broj stranica
pagesArray: number[] = [];
user:any

currentForm:any
form012:any={}
form1319:any={}
form2040:any={}
form4060:any={}
form6080:any={}
form80plus:any={}


questionnaireId:number=0

addItem(forma:any){
  //ovo dobijamo od deteta
  //console.log(forma);
  let name=forma.get('name').value
  switch (name) {
    case '012': this.form012=forma; break;
    case '1319': this.form1319=forma; break;
    case '2040': this.form2040=forma; break;
    case '4060': this.form4060=forma; break;
    case '6080': this.form6080=forma; break;
    case '80plus': this.form80plus=forma; 
  }

  
}
constructor(
  @Optional() public dialogRef: MatDialogRef<QuestionnaireComponent>,
  @Optional() @Inject(MAT_DIALOG_DATA) public data:any,
  private fbStart: FormBuilder,
            private toster:ToastrService,  
            private patientService:PatientService,
            private doctorService:DoctorService,
            public dialog: MatDialog
            
){

  this.form012 = this.fbStart.group({
    name:['012'],
    occupationalExposureChildhood: ['', Validators.required],
    weeksPerYearOccupational: ['', [Validators.required, Validators.min(1)]],
    yearsBackOccupational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyOccupational: ['', Validators.required],
    hatFrequencyOccupational: ['', Validators.required],
    clothingFrequencyOccupational: ['', Validators.required],
    shadeFrequencyOccupational: ['', Validators.required],

    recreationalExposureChildhood: ['', Validators.required],
    weeksPerYearRecreational: ['', [Validators.required, Validators.min(1)]],
    yearsBackRecreational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyRecreational: ['', Validators.required],
    hatFrequencyRecreational: ['', Validators.required],
    clothingFrequencyRecreational: ['', Validators.required],
    shadeFrequencyRecreational: ['', Validators.required],

    intentionalExposureChildhood: ['', Validators.required],
    weeksPerYearIntentional: ['', [Validators.required, Validators.min(1)]],
    yearsBackIntentional: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyIntentional: ['', Validators.required],
    hatFrequencyIntentional: ['', Validators.required],
    clothingFrequencyIntentional: ['', Validators.required],
    shadeFrequencyIntentional: ['', Validators.required]

    })
    this.form1319 = this.fbStart.group({
      name:['1319'],
      occupationalExposureChildhood: ['', Validators.required],
      weeksPerYearOccupational: ['', [Validators.required, Validators.min(1)]],
      yearsBackOccupational: ['', [Validators.required, Validators.min(1)]],
      sunscreenFrequencyOccupational: ['', Validators.required],
      hatFrequencyOccupational: ['', Validators.required],
      clothingFrequencyOccupational: ['', Validators.required],
      shadeFrequencyOccupational: ['', Validators.required],
  
      recreationalExposureChildhood: ['', Validators.required],
      weeksPerYearRecreational: ['', [Validators.required, Validators.min(1)]],
      yearsBackRecreational: ['', [Validators.required, Validators.min(1)]],
      sunscreenFrequencyRecreational: ['', Validators.required],
      hatFrequencyRecreational: ['', Validators.required],
      clothingFrequencyRecreational: ['', Validators.required],
      shadeFrequencyRecreational: ['', Validators.required],

      intentionalExposureChildhood: ['', Validators.required],
      weeksPerYearIntentional: ['', [Validators.required, Validators.min(1)]],
      yearsBackIntentional: ['', [Validators.required, Validators.min(1)]],
      sunscreenFrequencyIntentional: ['', Validators.required],
      hatFrequencyIntentional: ['', Validators.required],
      clothingFrequencyIntentional: ['', Validators.required],
      shadeFrequencyIntentional: ['', Validators.required]
    })

  this.form2040 = this.fbStart.group({

    name:['2040'],
     occupationalExposureChildhood: ['', Validators.required],
    weeksPerYearOccupational: ['', [Validators.required, Validators.min(1)]],
    yearsBackOccupational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyOccupational: ['', Validators.required],
    hatFrequencyOccupational: ['', Validators.required],
    clothingFrequencyOccupational: ['', Validators.required],
    shadeFrequencyOccupational: ['', Validators.required],

    recreationalExposureChildhood: ['', Validators.required],
    weeksPerYearRecreational: ['', [Validators.required, Validators.min(1)]],
    yearsBackRecreational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyRecreational: ['', Validators.required],
    hatFrequencyRecreational: ['', Validators.required],
    clothingFrequencyRecreational: ['', Validators.required],
    shadeFrequencyRecreational: ['', Validators.required],

    intentionalExposureChildhood: ['', Validators.required],
    weeksPerYearIntentional: ['', [Validators.required, Validators.min(1)]],
    yearsBackIntentional: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyIntentional: ['', Validators.required],
    hatFrequencyIntentional: ['', Validators.required],
    clothingFrequencyIntentional: ['', Validators.required],
    shadeFrequencyIntentional: ['', Validators.required]
  })


  this.form4060 = this.fbStart.group({
    name:['4060'],
     occupationalExposureChildhood: ['', Validators.required],
    weeksPerYearOccupational: ['', [Validators.required, Validators.min(1)]],
    yearsBackOccupational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyOccupational: ['', Validators.required],
    hatFrequencyOccupational: ['', Validators.required],
    clothingFrequencyOccupational: ['', Validators.required],
    shadeFrequencyOccupational: ['', Validators.required],

    recreationalExposureChildhood: ['', Validators.required],
    weeksPerYearRecreational: ['', [Validators.required, Validators.min(1)]],
    yearsBackRecreational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyRecreational: ['', Validators.required],
    hatFrequencyRecreational: ['', Validators.required],
    clothingFrequencyRecreational: ['', Validators.required],
    shadeFrequencyRecreational: ['', Validators.required],

    intentionalExposureChildhood: ['', Validators.required],
    weeksPerYearIntentional: ['', [Validators.required, Validators.min(1)]],
    yearsBackIntentional: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyIntentional: ['', Validators.required],
    hatFrequencyIntentional: ['', Validators.required],
    clothingFrequencyIntentional: ['', Validators.required],
    shadeFrequencyIntentional: ['', Validators.required]
  })
    
  this.form6080 = this.fbStart.group({
    name:['6080'],
     occupationalExposureChildhood: ['', Validators.required],
    weeksPerYearOccupational: ['', [Validators.required, Validators.min(1)]],
    yearsBackOccupational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyOccupational: ['', Validators.required],
    hatFrequencyOccupational: ['', Validators.required],
    clothingFrequencyOccupational: ['', Validators.required],
    shadeFrequencyOccupational: ['', Validators.required],

    recreationalExposureChildhood: ['', Validators.required],
    weeksPerYearRecreational: ['', [Validators.required, Validators.min(1)]],
    yearsBackRecreational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyRecreational: ['', Validators.required],
    hatFrequencyRecreational: ['', Validators.required],
    clothingFrequencyRecreational: ['', Validators.required],
    shadeFrequencyRecreational: ['', Validators.required],

    intentionalExposureChildhood: ['', Validators.required],
    weeksPerYearIntentional: ['', [Validators.required, Validators.min(1)]],
    yearsBackIntentional: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyIntentional: ['', Validators.required],
    hatFrequencyIntentional: ['', Validators.required],
    clothingFrequencyIntentional: ['', Validators.required],
    shadeFrequencyIntentional: ['', Validators.required]

  
    })

    
  this.form80plus = this.fbStart.group({
    name:['80plus'],
    occupationalExposureChildhood: ['', Validators.required],
    weeksPerYearOccupational: ['', [Validators.required, Validators.min(1)]],
    yearsBackOccupational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyOccupational: ['', Validators.required],
    hatFrequencyOccupational: ['', Validators.required],
    clothingFrequencyOccupational: ['', Validators.required],
    shadeFrequencyOccupational: ['', Validators.required],

    recreationalExposureChildhood: ['', Validators.required],
    weeksPerYearRecreational: ['', [Validators.required, Validators.min(1)]],
    yearsBackRecreational: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyRecreational: ['', Validators.required],
    hatFrequencyRecreational: ['', Validators.required],
    clothingFrequencyRecreational: ['', Validators.required],
    shadeFrequencyRecreational: ['', Validators.required],

    intentionalExposureChildhood: ['', Validators.required],
    weeksPerYearIntentional: ['', [Validators.required, Validators.min(1)]],
    yearsBackIntentional: ['', [Validators.required, Validators.min(1)]],
    sunscreenFrequencyIntentional: ['', Validators.required],
    hatFrequencyIntentional: ['', Validators.required],
    clothingFrequencyIntentional: ['', Validators.required],
    shadeFrequencyIntentional: ['', Validators.required]
    })


  this.questionnaireFormStart = this.fbStart.group({
    date: ['',Validators.required], //popunjava dr, odnosno sistem kad dr udje u upitnik
    consent: [true],
    gender: [null,Validators.required],
    birthYear: [null,Validators.required],
    birthPlace: [null,Validators.required],
    residence: [null,Validators.required],
    weight: [null,Validators.required],
    height: [null,Validators.required],
    ethnicity: [null,Validators.required],
    otherEthnicity: [null, Validators.required],
    educationLevel: [null,Validators.required],
    livingAlone: [null,Validators.required],
    reasonForComing:[null,Validators.required],
    fullBodyCheck: [null,Validators.required],
    hairColor: [null,Validators.required],
    freckles: [null,Validators.required],
    sunReaction:[null,Validators.required],


  });

  this.questionnaireFormEnd = this.fbStart.group({
    tanningExposure: [null, Validators.required],
    sunnyCountryExposure: this.fbStart.group({
      exposure: [null, Validators.required],
      yearsBefore18: [null, Validators.required],
      locationBefore18: [null, Validators.required],
      yearsAfter18: [null, Validators.required],
      locationAfter18: [null, Validators.required]
    }),
    solariumUse: this.fbStart.group({
      usedSolarium: [null, Validators.required],
      totalVisits: [null, Validators.required],
      firstVisitAge: [null, Validators.required],
      lastVisitAge: [null, Validators.required]
    }),
    sunburns: this.fbStart.group({
      childhood: [null, Validators.required],
      adolescence: [null, Validators.required],
      between20and40: [null, Validators.required],
      between40and60: [null, Validators.required],
      between60and80: [null, Validators.required],
      after80: [null, Validators.required]
    })
  });
  
  this.questionnaireFormDoctor = this.fbStart.group({
    patientPurpose: [null, Validators.required],
    otherPurpose: [null, Validators.required],
    familyHistoryMelanoma: [null, Validators.required],
    familyHistoryNonMelanoma: [null, Validators.required],
    personalHistoryMelanoma: this.fbStart.group({
      history: [null, Validators.required],
      count: [null, Validators.required]
    }),
    personalHistoryCarcinoma: this.fbStart.group({
      history: [null, Validators.required],
      bccCount: [null, Validators.required],
      sccCount: [null, Validators.required],
      otherDescription: [null, Validators.required]
    }),
    skinExaminationToday: [null, Validators.required],
    dermoscopyPerformed: [null, Validators.required],
    nevusCount: [null, Validators.required],
    nevusOnHands: [null, Validators.required],
    atypicalNeviPresence: this.fbStart.group({
      presence: [null, Validators.required],
      count: [null, Validators.required]
    }),
    congenitalNevi: this.fbStart.group({
      mediumSize: [null, Validators.required],
      mediumLocation: [null, Validators.required],
      giantSize: [null, Validators.required],
      giantLocation: [null, Validators.required]
    }),
    solarLentigo: [null, Validators.required],
    suspiciousLesions: this.fbStart.group({
      melanoma: [null, Validators.required],
      melanomaCount: [null, Validators.required],
      melanomaDetectedBy: [null, Validators.required],
      bcc: [null, Validators.required],
      bccCount: [null, Validators.required],
      bccDetectedBy: [null, Validators.required],
      scc: [null, Validators.required],
      sccCount: [null, Validators.required],
      sccDetectedBy: [null, Validators.required],
      actinicKeratosis:[null, Validators.required],
      actinicKeratosisCount:[null, Validators.required],
      actinicKeratosisDetectedBy: [null, Validators.required],
      exactActinicKeratosisCount:[null,Validators.required],
      otherLesions: [null, Validators.required],
      otherLesionsDescription: [null, Validators.required]
    }),
    otherConditions: this.fbStart.group({
      hematological: [null, Validators.required],
      hiv: [null, Validators.required],
      immunosuppression: [null, Validators.required],
      immunosuppressionOther: [null, Validators.required],
      otherSignificantConditions: [null, Validators.required],
      otherSignificantConditionsOther: [null, Validators.required]
    }),
    smoking: [null, Validators.required],
    exSmoker: [null, Validators.required]
  });

  
  this.questionnaireFormStart.get('ethnicity')?.valueChanges.subscribe((value:any) => {
    if (value === 'druga') {
      this.questionnaireFormStart.get('otherEthnicity').setValidators([Validators.required]);
    } else {
      this.questionnaireFormStart.get('otherEthnicity').clearValidators()
      this.questionnaireFormStart.get('otherEthnicity').updateValueAndValidity();
    }
  });

  this.questionnaireFormEnd.get('sunnyCountryExposure.exposure')?.valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormEnd.get('sunnyCountryExposure.yearsBefore18').setValidators([Validators.required]);
      this.questionnaireFormEnd.get('sunnyCountryExposure.locationBefore18').setValidators([Validators.required]);
      this.questionnaireFormEnd.get('sunnyCountryExposure.yearsAfter18').setValidators([Validators.required]);
      this.questionnaireFormEnd.get('sunnyCountryExposure.locationAfter18').setValidators([Validators.required]);

    } else {
      this.questionnaireFormEnd.get('sunnyCountryExposure.yearsBefore18').clearValidators()
      this.questionnaireFormEnd.get('sunnyCountryExposure.yearsBefore18').updateValueAndValidity()

      this.questionnaireFormEnd.get('sunnyCountryExposure.locationBefore18').clearValidators();
      this.questionnaireFormEnd.get('sunnyCountryExposure.locationBefore18').updateValueAndValidity();

      this.questionnaireFormEnd.get('sunnyCountryExposure.yearsAfter18').clearValidators();
      this.questionnaireFormEnd.get('sunnyCountryExposure.yearsAfter18').updateValueAndValidity()

      this.questionnaireFormEnd.get('sunnyCountryExposure.locationAfter18').clearValidators();
      this.questionnaireFormEnd.get('sunnyCountryExposure.locationAfter18').updateValueAndValidity()
    }
  });

  
  this.questionnaireFormEnd.get('solariumUse.usedSolarium')?.valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormEnd.get('solariumUse.totalVisits').setValidators([Validators.required]);
      this.questionnaireFormEnd.get('solariumUse.firstVisitAge').setValidators([Validators.required]);
      this.questionnaireFormEnd.get('solariumUse.lastVisitAge').setValidators([Validators.required]);
 

    } else {
      this.questionnaireFormEnd.get('solariumUse.totalVisits').clearValidators()
      this.questionnaireFormEnd.get('solariumUse.totalVisits').updateValueAndValidity()

      this.questionnaireFormEnd.get('solariumUse.firstVisitAge').clearValidators();
      this.questionnaireFormEnd.get('solariumUse.firstVisitAge').updateValueAndValidity();

      this.questionnaireFormEnd.get('solariumUse.lastVisitAge').clearValidators();
      this.questionnaireFormEnd.get('solariumUse.lastVisitAge').updateValueAndValidity()

    }
  });

  this.questionnaireFormDoctor.get('patientPurpose')?.valueChanges.subscribe((value:any) => {
    if (value === 'other') {
      this.questionnaireFormDoctor.get('otherPurpose').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('otherPurpose').clearValidators()
      this.questionnaireFormDoctor.get('otherPurpose').updateValueAndValidity();
    }
  });

  
  this.questionnaireFormDoctor.get('personalHistoryMelanoma.history')?.valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('personalHistoryMelanoma.count').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('personalHistoryMelanoma.count').clearValidators()
      this.questionnaireFormDoctor.get('personalHistoryMelanoma.count').updateValueAndValidity();
    }
  });


    
  this.questionnaireFormDoctor.get('personalHistoryCarcinoma.history')?.valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('personalHistoryCarcinoma.bccCount').setValidators([Validators.required]);
      this.questionnaireFormDoctor.get('personalHistoryCarcinoma.sccCount').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('personalHistoryCarcinoma.bccCount').clearValidators()
      this.questionnaireFormDoctor.get('personalHistoryCarcinoma.bccCount').updateValueAndValidity();
      this.questionnaireFormDoctor.get('personalHistoryCarcinoma.sccCount').clearValidators()
      this.questionnaireFormDoctor.get('personalHistoryCarcinoma.sccCount').updateValueAndValidity();
      if (value=='other') {
        this.questionnaireFormDoctor.get('personalHistoryCarcinoma.otherDescription').setValidators([Validators.required]);
      }
      else 
      {
        this.questionnaireFormDoctor.get('personalHistoryCarcinoma.otherDescription').clearValidators()
        this.questionnaireFormDoctor.get('personalHistoryCarcinoma.otherDescription').updateValueAndValidity()
      }
    }
  });

    
  this.questionnaireFormDoctor.get('atypicalNeviPresence.presence')?.valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('atypicalNeviPresence.count').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('atypicalNeviPresence.count').clearValidators()
      this.questionnaireFormDoctor.get('atypicalNeviPresence.count').updateValueAndValidity();
    }
  });

  this.questionnaireFormDoctor.get('congenitalNevi.mediumSize')?.valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('congenitalNevi.mediumLocation').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('congenitalNevi.mediumLocation').clearValidators()
      this.questionnaireFormDoctor.get('congenitalNevi.mediumLocation').updateValueAndValidity();
    }
  });

  this.questionnaireFormDoctor.get('congenitalNevi.giantSize').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('congenitalNevi.giantLocation').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('congenitalNevi.giantLocation').clearValidators()
      this.questionnaireFormDoctor.get('congenitalNevi.giantLocation').updateValueAndValidity();
    }
  });

  this.questionnaireFormDoctor.get('suspiciousLesions.melanoma').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('suspiciousLesions.melanomaCount').setValidators([Validators.required]);
      this.questionnaireFormDoctor.get('suspiciousLesions.melanomaDetectedBy').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('suspiciousLesions.melanomaCount').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.melanomaCount').updateValueAndValidity();
      this.questionnaireFormDoctor.get('suspiciousLesions.melanomaDetectedBy').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.melanomaDetectedBy').updateValueAndValidity();
    }
  });

  this.questionnaireFormDoctor.get('suspiciousLesions.bcc').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('suspiciousLesions.bccCount').setValidators([Validators.required]);
      this.questionnaireFormDoctor.get('suspiciousLesions.bccDetectedBy').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('suspiciousLesions.bccCount').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.bccCount').updateValueAndValidity();
      this.questionnaireFormDoctor.get('suspiciousLesions.bccDetectedBy').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.bccDetectedBy').updateValueAndValidity();
    }
  });

  this.questionnaireFormDoctor.get('suspiciousLesions.scc').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('suspiciousLesions.sccCount').setValidators([Validators.required]);
      this.questionnaireFormDoctor.get('suspiciousLesions.sccDetectedBy').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('suspiciousLesions.sccCount').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.sccCount').updateValueAndValidity();
      this.questionnaireFormDoctor.get('suspiciousLesions.sccDetectedBy').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.sccDetectedBy').updateValueAndValidity();
    }
  });

  this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosis').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisCount').setValidators([Validators.required]);
      this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisDetectedBy').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisCount').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisCount').updateValueAndValidity();
      this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisDetectedBy').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisDetectedBy').updateValueAndValidity();
    }
  });

  
  this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisCount').valueChanges.subscribe((value:any) => {
    if (value === '<10') {
      this.questionnaireFormDoctor.get('suspiciousLesions.exactActinicKeratosisCount').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('suspiciousLesions.exactActinicKeratosisCount').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.exactActinicKeratosisCount').updateValueAndValidity();

    }
  });

  
  this.questionnaireFormDoctor.get('suspiciousLesions.otherLesions').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('suspiciousLesions.otherLesionsDescription').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('suspiciousLesions.otherLesionsDescription').clearValidators()
      this.questionnaireFormDoctor.get('suspiciousLesions.otherLesionsDescription').updateValueAndValidity();
    }
  });

  this.questionnaireFormDoctor.get('otherConditions.immunosuppression').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('otherConditions.immunosuppressionOther').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('otherConditions.immunosuppressionOther').clearValidators()
      this.questionnaireFormDoctor.get('otherConditions.immunosuppressionOther').updateValueAndValidity();
    }
  });

  this.questionnaireFormDoctor.get('otherConditions.otherSignificantConditions').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.questionnaireFormDoctor.get('otherConditions.otherSignificantConditionsOther').setValidators([Validators.required]);
    } else {
      this.questionnaireFormDoctor.get('otherConditions.otherSignificantConditionsOther').clearValidators()
      this.questionnaireFormDoctor.get('otherConditions.otherSignificantConditionsOther').updateValueAndValidity();
    }
  });
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

disableFormFields(formGroup: FormGroup): void {
  Object.keys(formGroup.controls).forEach(key => {
    formGroup.get(key)?.disable();
  });
}

ngOnInit(){
  let user_help=sessionStorage.getItem("auth-user")
if (sessionStorage.getItem("012")) sessionStorage.removeItem("012")
  if (sessionStorage.getItem("1319")) sessionStorage.removeItem("1319")
    if (sessionStorage.getItem("2040")) sessionStorage.removeItem("2040")
      if (sessionStorage.getItem("4060")) sessionStorage.removeItem("4060")
        if (sessionStorage.getItem("6080")) sessionStorage.removeItem("6080")
          if (sessionStorage.getItem("80plus")) sessionStorage.removeItem("80plus")
  if (user_help) 
    {
      this.user=JSON.parse(user_help);
      if (this.user.userType=='Patient') {
        //takodje, sakrivamo onaj deo koji popunjava doktor
       this.questionnaireFormStart.get('date').clearValidators()
       this.questionnaireFormStart.get('date').updateValueAndValidity()
       this.totalPages=11;
      }
      else {
this.disableFormFields(this.questionnaireFormStart)
this.disableFormFields(this.questionnaireFormEnd)
if (this.user.userType=='Admin') {
  this.disableFormFields(this.questionnaireFormDoctor)
}
        //prikazujemo deo koji popunjava doktor.

      }
    }
  else this.user={}


}
onSubmit() {
  this.questionnaireFormStart.markAllAsTouched();
  this.questionnaireFormEnd.markAllAsTouched();
  this.questionnaireFormDoctor.markAllAsTouched();

  this.form012.markAllAsTouched();
  this.form1319.markAllAsTouched();
  this.form2040.markAllAsTouched();
  this.form4060.markAllAsTouched();
  this.form6080.markAllAsTouched();
  this.form80plus.markAllAsTouched();
  const dialogRef = this.dialog.open(ExaminationResultsComponent, {
    width: "610px",
    data: {patientId:2, score: 100, id:1}
  });

  return
  if (this.user.userType=='Patient') {
    if  (!this.questionnaireFormStart.valid || !this.questionnaireFormEnd.valid  || !this.form012.valid || !this.form1319.valid 
      || !this.form2040.valid ||!this.form4060.valid || !this.form6080.valid || !this.form80plus.valid
    ) 
    {      
      this.toster.error("Niste popunili sva polja!"); 
      return
    }
    else 
    {
    // salji za pacijenta.
    //kreira se questionnaire i QuestionnaireDataPatient
    const formData: any = {
      patientId: this.user.id,
      date:null,
      consent: this.questionnaireFormStart .get('consent').value,
      gender: this.questionnaireFormStart .get('gender').value,
      birthYear: this.questionnaireFormStart.get('birthYear').value,
      birthPlace: this.questionnaireFormStart.get('birthPlace').value,
      residence: this.questionnaireFormStart.get('residence').value,
      weight: this.questionnaireFormStart.get('weight').value,
      height: this.questionnaireFormStart.get('height').value,
      ethnicity: this.questionnaireFormStart.get('ethnicity').value,
      otherEthnicity: this.questionnaireFormStart.get('otherEthnicity').value,
      educationLevel: this.questionnaireFormStart.get('educationLevel').value,
      livingAlone: this.questionnaireFormStart.get('livingAlone').value,
      reasonForComing: this.questionnaireFormStart.get('reasonForComing').value,
      fullBodyCheck: this.questionnaireFormStart.get('fullBodyCheck').value,
      hairColor: this.questionnaireFormStart.get('hairColor').value,
      freckles: this.questionnaireFormStart.get('freckles').value,
      sunReaction: this.questionnaireFormStart.get('sunReaction').value,

      tanningExposure: this.questionnaireFormEnd .get('tanningExposure').value,
      sunnyCountryExposure: {
          exposure: this.questionnaireFormEnd .get('sunnyCountryExposure').get('exposure').value,
          yearsBefore18: this.questionnaireFormEnd.get('sunnyCountryExposure').get('yearsBefore18').value,
          locationBefore18: this.questionnaireFormEnd.get('sunnyCountryExposure').get('locationBefore18').value,
          yearsAfter18: this.questionnaireFormEnd.get('sunnyCountryExposure').get('yearsAfter18').value,
          locationAfter18: this.questionnaireFormEnd.get('sunnyCountryExposure').get('locationAfter18').value,
      },
      solariumUse: {
          usedSolarium: this.questionnaireFormEnd.get('solariumUse').get('usedSolarium').value,
          totalVisits: this.questionnaireFormEnd.get('solariumUse').get('totalVisits').value,
          firstVisitAge: this.questionnaireFormEnd.get('solariumUse').get('firstVisitAge').value,
          lastVisitAge: this.questionnaireFormEnd.get('solariumUse').get('lastVisitAge').value,
      },
      sunburns: {
          childhood: this.questionnaireFormEnd.get('sunburns').get('childhood').value,
          adolescence: this.questionnaireFormEnd.get('sunburns').get('adolescence').value,
          between20and40: this.questionnaireFormEnd.get('sunburns').get('between20and40').value,
          between40and60: this.questionnaireFormEnd.get('sunburns').get('between40and60').value,
          between60and80: this.questionnaireFormEnd.get('sunburns').get('between60and80').value,
          after80: this.questionnaireFormEnd.get('sunburns').get('after80').value,
      },

      sunExposureFromAge0to12: this.convertToExposureArray(this.form012),
      sunExposureFromAge13to19: this.convertToExposureArray(this.form1319),
      sunExposureFromAge20to40: this.convertToExposureArray(this.form2040),
      sunExposureFromAge40to60: this.convertToExposureArray(this.form4060),
      sunExposureFromAge60to80: this.convertToExposureArray(this.form6080),
      sunExposureAfterAge80: this.convertToExposureArray(this.form80plus),
  };

  // Slanje podataka backend-u
  this.patientService.insertPatientData(formData).subscribe((response:any) => {
      if (response.success) {
        this.toster.success("Podaci uspešno uneti!")
        //vrati ti ceo upitnik, znaci imamo ID i Score
        const dialogRef = this.dialog.open(ExaminationResultsComponent, {
          width: "610px",
          data: {patientId:this.user.id, score: response.result.score, id:response.result.id}
        });
      }
      else {
        this.toster.error('Greška pri slanju podataka', "Oprez!");
      }
  }, );
  
    }
  }
  else {
    if  (!this.questionnaireFormDoctor.valid) 
    {
    this.toster.error("Niste popunili sva polja!"); 
    return
    }
    else {
      //salji za doktora
        //kreira se doctor_notes
        let model={

            questionnaireID: this.questionnaireId, // Pretpostavljam da ovaj ID dolazi iz forme ili nekog drugog izvora
            patientPurpose: this.questionnaireFormDoctor.get('patientPurpose'),
            familyHistoryMelanoma: this.questionnaireFormDoctor.get('familyHistoryMelanoma'),
            familyHistoryNonMelanoma: this.questionnaireFormDoctor.get('familyHistoryNonMelanoma'),
            personalHistoryMelanoma: {
              history: this.questionnaireFormDoctor.get('personalHistoryMelanoma.history'),
              count: this.questionnaireFormDoctor.get('personalHistoryMelanoma.count'),
            },
            personalHistoryCarcinoma: {
              history: this.questionnaireFormDoctor.get('personalHistoryCarcinoma.history'),
              bccCount: this.questionnaireFormDoctor.get('personalHistoryCarcinoma.bccCount'),
              sccCount: this.questionnaireFormDoctor.get('personalHistoryCarcinoma.sccCount'),
              otherDescription: this.questionnaireFormDoctor.get('personalHistoryCarcinoma.otherDescription')
            },
            skinExaminationToday: this.questionnaireFormDoctor.get('skinExaminationToday'),
            dermoscopyPerformed: this.questionnaireFormDoctor.get('dermoscopyPerformed'),
            nevusCount: this.questionnaireFormDoctor.get('nevusCount'),
            moreThanTwentyNevusOnHands: this.questionnaireFormDoctor.get('nevusOnHands'),
            atypicalNeviPresence: {
              presence: this.questionnaireFormDoctor.get('atypicalNeviPresence.presence'),
              count: this.questionnaireFormDoctor.get('atypicalNeviPresence.count'),
            },
            congenitalNevi: {
              mediumSize: this.questionnaireFormDoctor.get('congenitalNevi.mediumSize'),
              mediumLocation: this.questionnaireFormDoctor.get('congenitalNevi.mediumLocation'),
              giantSize: this.questionnaireFormDoctor.get('congenitalNevi.giantSize'),
              giantLocation: this.questionnaireFormDoctor.get('congenitalNevi.giantLocation'),
            },
            solarLentigo: this.questionnaireFormDoctor.get('solarLentigo'),
            suspiciousLesions: {
              melanoma: this.questionnaireFormDoctor.get('suspiciousLesions.melanoma'),
              melanomaCount: this.questionnaireFormDoctor.get('suspiciousLesions.melanomaCount'),
              melanomaDetectedBy: this.questionnaireFormDoctor.get('suspiciousLesions.melanomaDetectedBy'),
              bcc: this.questionnaireFormDoctor.get('suspiciousLesions.bcc'),
              bccCount: this.questionnaireFormDoctor.get('suspiciousLesions.bccCount'),
              bccDetectedBy: this.questionnaireFormDoctor.get('suspiciousLesions.bccDetectedBy'),
              scc: this.questionnaireFormDoctor.get('suspiciousLesions.scc'),
              sccCount: this.questionnaireFormDoctor.get('suspiciousLesions.sccCount'),
              sccDetectedBy: this.questionnaireFormDoctor.get('suspiciousLesions.sccDetectedBy'),
              actinicKeratosis: this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosis'),
              actinicKeratosisCount: this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisCount'),
              actinicKeratosisDetectedBy: this.questionnaireFormDoctor.get('suspiciousLesions.actinicKeratosisDetectedBy'),
              exactActinicKeratosisCount: this.questionnaireFormDoctor.get('suspiciousLesions.exactActinicKeratosisCount'),
              otherLesions: this.questionnaireFormDoctor.get('suspiciousLesions.otherLesions'),
              otherLesionsDescription: this.questionnaireFormDoctor.get('suspiciousLesions.otherLesionsDescription'),
            },
            otherConditions: {
              hematological: this.questionnaireFormDoctor.get('otherConditions.hematological'),
              hiv: this.questionnaireFormDoctor.get('otherConditions.hiv'),
              immunosuppression: this.questionnaireFormDoctor.get('otherConditions.immunosuppression'),
              immunosuppressionOther: this.questionnaireFormDoctor.get('otherConditions.immunosuppressionOther'),
              otherSignificantConditions: this.questionnaireFormDoctor.get('otherConditions.otherSignificantConditions'),
              otherSignificantConditionsOther: this.questionnaireFormDoctor.get('otherConditions.otherSignificantConditionsOther'),
            },
            smoking: this.questionnaireFormDoctor.get('smoking'),
            exSmoker: this.questionnaireFormDoctor.get('exSmoker'),
          

        }
        console.log(model);
        
        this.doctorService.AddDoctorNotes(model).subscribe((res:any)=>{
          if (res.success) {
            this.toster.success("Podaci su uspešno uneti.", "Čestitke!")
          }
        })
    }
  }
 

  }

  convertToExposureArray(formGroup: FormGroup) {
    return JSON.stringify([
      {
        name: 'occupational_exposure',
        info: {
          exposed: formGroup.get('occupationalExposureChildhood')?.value,
          weeksPerYear: formGroup.get('weeksPerYearOccupational')?.value,
          yearsBack: formGroup.get('yearsBackOccupational')?.value,
          sunscreenFrequency: formGroup.get('sunscreenFrequencyOccupational')?.value,
          hatFrequency: formGroup.get('hatFrequencyOccupational')?.value,
          clothingFrequency: formGroup.get('clothingFrequencyOccupational')?.value,
          shadeFrequency: formGroup.get('shadeFrequencyOccupational')?.value
        }
      },
      {
        name: 'recreational_exposure',
        info: {
          exposed: formGroup.get('recreationalExposureChildhood')?.value,
          weeksPerYear: formGroup.get('weeksPerYearRecreational')?.value,
          yearsBack: formGroup.get('yearsBackRecreational')?.value,
          sunscreenFrequency: formGroup.get('sunscreenFrequencyRecreational')?.value,
          hatFrequency: formGroup.get('hatFrequencyRecreational')?.value,
          clothingFrequency: formGroup.get('clothingFrequencyRecreational')?.value,
          shadeFrequency: formGroup.get('shadeFrequencyRecreational')?.value
        }
      },
      {
        name: 'intentional_exposure',
        info: {
          exposed: formGroup.get('intentionalExposureChildhood')?.value,
          weeksPerYear: formGroup.get('weeksPerYearIntentional')?.value,
          yearsBack: formGroup.get('yearsBackIntentional')?.value,
          sunscreenFrequency: formGroup.get('sunscreenFrequencyIntentional')?.value,
          hatFrequency: formGroup.get('hatFrequencyIntentional')?.value,
          clothingFrequency: formGroup.get('clothingFrequencyIntentional')?.value,
          shadeFrequency: formGroup.get('shadeFrequencyIntentional')?.value
        }
      }
    ]);
  }

krajForme() {
  this.currentPage=this.totalPages;
}
}
