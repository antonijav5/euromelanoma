import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { ExaminationResultsComponent } from '../examination-results/examination-results.component';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css',
})
export class QuestionnaireComponent implements OnInit {
  questionnaireFormStart: any;
  questionnaireFormEnd: any;
  questionnaireFormDoctor: any;
  currentPage: number = 1;
  totalPages: number = 13;
  pagesArray: number[] = [];
  user: any;

  currentForm: any;
  form012: any = {};
  form1319: any = {};
  form2040: any = {};
  form4060: any = {};
  form6080: any = {};
  form80plus: any = {};
  doctorNotesExists: boolean = false;
  showSubmitButton: boolean = true;
  questionnaireId: number = 0;
  formsMap: { [key: number]: FormGroup } = {};
  loadedQuestionnaireData: any = null;
  addItem(forma: any) {
    let name = forma.get('name').value;
    switch (name) {
      case '012':
        this.form012 = forma;
        break;
      case '1319':
        this.form1319 = forma;
        break;
      case '2040':
        this.form2040 = forma;
        break;
      case '4060':
        this.form4060 = forma;
        break;
      case '6080':
        this.form6080 = forma;
        break;
      case '80plus':
        this.form80plus = forma;
    }
  }
  constructor(
    @Optional() public dialogRef: MatDialogRef<QuestionnaireComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fbStart: FormBuilder,
    private toster: ToastrService,
    private patientService: PatientService,
    private doctorService: DoctorService,
    public dialog: MatDialog
  ) {
    this.form012 = this.createExposureForm('012');
    this.form1319 = this.createExposureForm('1319');
    this.form2040 = this.createExposureForm('2040');
    this.form4060 = this.createExposureForm('4060');
    this.form6080 = this.createExposureForm('6080');
    this.form80plus = this.createExposureForm('80plus');
    this.questionnaireFormStart = this.fbStart.group({
      date: ['', Validators.required], //popunjava dr, odnosno sistem kad dr udje u upitnik
      consent: [true],
      gender: [null, Validators.required],
      birthYear: [null, Validators.required],
      birthPlace: [null, Validators.required],
      residence: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      ethnicity: [null, Validators.required],
      otherEthnicity: [null, Validators.required],
      educationLevel: [null, Validators.required],
      livingAlone: [null, Validators.required],
      reasonForComing: [null, Validators.required],
      fullBodyCheck: [null, Validators.required],
      hairColor: [null, Validators.required],
      freckles: [null, Validators.required],
      sunReaction: [null, Validators.required],
    });

    this.questionnaireFormEnd = this.fbStart.group({
      tanningExposure: [null, Validators.required],
      sunnyCountryExposure: this.fbStart.group({
        exposure: [null, Validators.required],
        yearsBefore18: [null, Validators.required],
        locationBefore18: [null, Validators.required],
        yearsAfter18: [null, Validators.required],
        locationAfter18: [null, Validators.required],
      }),
      solariumUse: this.fbStart.group({
        usedSolarium: [null, Validators.required],
        totalVisits: [null, Validators.required],
        firstVisitAge: [null, Validators.required],
        lastVisitAge: [null, Validators.required],
      }),
      sunburns: this.fbStart.group({
        childhood: [null, Validators.required],
        adolescence: [null, Validators.required],
        between20and40: [null, Validators.required],
        between40and60: [null, Validators.required],
        between60and80: [null, Validators.required],
        after80: [null, Validators.required],
      }),
    });

    this.questionnaireFormDoctor = this.fbStart.group({
      patientPurpose: [null, Validators.required],
      otherPurpose: [null, Validators.required],
      familyHistoryMelanoma: [null, Validators.required],
      familyHistoryNonMelanoma: [null, Validators.required],
      personalHistoryMelanoma: this.fbStart.group({
        history: [null, Validators.required],
        count: [null, Validators.required],
      }),
      personalHistoryCarcinoma: this.fbStart.group({
        history: [null, Validators.required],
        bccCount: [null, Validators.required],
        sccCount: [null, Validators.required],
        otherDescription: [null, Validators.required],
      }),
      skinExaminationToday: [null, Validators.required],
      dermoscopyPerformed: [null, Validators.required],
      nevusCount: [null, Validators.required],
      nevusOnHands: [null, Validators.required],
      atypicalNeviPresence: this.fbStart.group({
        presence: [null, Validators.required],
        count: [null, Validators.required],
      }),
      congenitalNevi: this.fbStart.group({
        mediumSize: [null, Validators.required],
        mediumLocation: [null, Validators.required],
        giantSize: [null, Validators.required],
        giantLocation: [null, Validators.required],
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
        actinicKeratosis: [null, Validators.required],
        actinicKeratosisCount: [null, Validators.required],
        actinicKeratosisDetectedBy: [null, Validators.required],
        exactActinicKeratosisCount: [null, Validators.required],
        otherLesions: [null, Validators.required],
        otherLesionsDescription: [null, Validators.required],
      }),
      otherConditions: this.fbStart.group({
        hematological: [null, Validators.required],
        hiv: [null, Validators.required],
        immunosuppression: [null, Validators.required],
        immunosuppressionOther: [null, Validators.required],
        otherSignificantConditions: [null, Validators.required],
        otherSignificantConditionsOther: [null, Validators.required],
      }),
      smoking: [null, Validators.required],
      exSmoker: ['yes', Validators.required],
    });

    this.questionnaireFormStart
      .get('ethnicity')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'druga') {
          this.questionnaireFormStart
            .get('otherEthnicity')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormStart.get('otherEthnicity').clearValidators();
          this.questionnaireFormStart
            .get('otherEthnicity')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormEnd
      .get('sunnyCountryExposure.exposure')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.yearsBefore18')
            .setValidators([Validators.required]);
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.locationBefore18')
            .setValidators([Validators.required]);
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.yearsAfter18')
            .setValidators([Validators.required]);
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.locationAfter18')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.yearsBefore18')
            .clearValidators();
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.yearsBefore18')
            .updateValueAndValidity();

          this.questionnaireFormEnd
            .get('sunnyCountryExposure.locationBefore18')
            .clearValidators();
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.locationBefore18')
            .updateValueAndValidity();

          this.questionnaireFormEnd
            .get('sunnyCountryExposure.yearsAfter18')
            .clearValidators();
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.yearsAfter18')
            .updateValueAndValidity();

          this.questionnaireFormEnd
            .get('sunnyCountryExposure.locationAfter18')
            .clearValidators();
          this.questionnaireFormEnd
            .get('sunnyCountryExposure.locationAfter18')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormEnd
      .get('solariumUse.usedSolarium')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormEnd
            .get('solariumUse.totalVisits')
            .setValidators([Validators.required]);
          this.questionnaireFormEnd
            .get('solariumUse.firstVisitAge')
            .setValidators([Validators.required]);
          this.questionnaireFormEnd
            .get('solariumUse.lastVisitAge')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormEnd
            .get('solariumUse.totalVisits')
            .clearValidators();
          this.questionnaireFormEnd
            .get('solariumUse.totalVisits')
            .updateValueAndValidity();

          this.questionnaireFormEnd
            .get('solariumUse.firstVisitAge')
            .clearValidators();
          this.questionnaireFormEnd
            .get('solariumUse.firstVisitAge')
            .updateValueAndValidity();

          this.questionnaireFormEnd
            .get('solariumUse.lastVisitAge')
            .clearValidators();
          this.questionnaireFormEnd
            .get('solariumUse.lastVisitAge')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('patientPurpose')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'other') {
          this.questionnaireFormDoctor
            .get('otherPurpose')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor.get('otherPurpose').clearValidators();
          this.questionnaireFormDoctor
            .get('otherPurpose')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('personalHistoryMelanoma.history')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('personalHistoryMelanoma.count')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('personalHistoryMelanoma.count')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('personalHistoryMelanoma.count')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('personalHistoryCarcinoma.history')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('personalHistoryCarcinoma.bccCount')
            .setValidators([Validators.required]);
          this.questionnaireFormDoctor
            .get('personalHistoryCarcinoma.sccCount')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('personalHistoryCarcinoma.bccCount')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('personalHistoryCarcinoma.bccCount')
            .updateValueAndValidity();
          this.questionnaireFormDoctor
            .get('personalHistoryCarcinoma.sccCount')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('personalHistoryCarcinoma.sccCount')
            .updateValueAndValidity();
          if (value == 'other') {
            this.questionnaireFormDoctor
              .get('personalHistoryCarcinoma.otherDescription')
              .setValidators([Validators.required]);
          } else {
            this.questionnaireFormDoctor
              .get('personalHistoryCarcinoma.otherDescription')
              .clearValidators();
            this.questionnaireFormDoctor
              .get('personalHistoryCarcinoma.otherDescription')
              .updateValueAndValidity();
          }
        }
      });

    this.questionnaireFormDoctor
      .get('atypicalNeviPresence.presence')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('atypicalNeviPresence.count')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('atypicalNeviPresence.count')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('atypicalNeviPresence.count')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('congenitalNevi.mediumSize')
      ?.valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('congenitalNevi.mediumLocation')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('congenitalNevi.mediumLocation')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('congenitalNevi.mediumLocation')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('congenitalNevi.giantSize')
      .valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('congenitalNevi.giantLocation')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('congenitalNevi.giantLocation')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('congenitalNevi.giantLocation')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('suspiciousLesions.melanoma')
      .valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.melanomaCount')
            .setValidators([Validators.required]);
          this.questionnaireFormDoctor
            .get('suspiciousLesions.melanomaDetectedBy')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.melanomaCount')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.melanomaCount')
            .updateValueAndValidity();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.melanomaDetectedBy')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.melanomaDetectedBy')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('suspiciousLesions.bcc')
      .valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.bccCount')
            .setValidators([Validators.required]);
          this.questionnaireFormDoctor
            .get('suspiciousLesions.bccDetectedBy')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.bccCount')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.bccCount')
            .updateValueAndValidity();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.bccDetectedBy')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.bccDetectedBy')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('suspiciousLesions.scc')
      .valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.sccCount')
            .setValidators([Validators.required]);
          this.questionnaireFormDoctor
            .get('suspiciousLesions.sccDetectedBy')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.sccCount')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.sccCount')
            .updateValueAndValidity();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.sccDetectedBy')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.sccDetectedBy')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('suspiciousLesions.actinicKeratosis')
      .valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.actinicKeratosisCount')
            .setValidators([Validators.required]);
          this.questionnaireFormDoctor
            .get('suspiciousLesions.actinicKeratosisDetectedBy')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.actinicKeratosisCount')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.actinicKeratosisCount')
            .updateValueAndValidity();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.actinicKeratosisDetectedBy')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.actinicKeratosisDetectedBy')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('suspiciousLesions.actinicKeratosisCount')
      .valueChanges.subscribe((value: any) => {
        if (value === '<10') {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.exactActinicKeratosisCount')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.exactActinicKeratosisCount')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.exactActinicKeratosisCount')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('suspiciousLesions.otherLesions')
      .valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.otherLesionsDescription')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('suspiciousLesions.otherLesionsDescription')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('suspiciousLesions.otherLesionsDescription')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('otherConditions.immunosuppression')
      .valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('otherConditions.immunosuppressionOther')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('otherConditions.immunosuppressionOther')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('otherConditions.immunosuppressionOther')
            .updateValueAndValidity();
        }
      });

    this.questionnaireFormDoctor
      .get('otherConditions.otherSignificantConditions')
      .valueChanges.subscribe((value: any) => {
        if (value === 'yes') {
          this.questionnaireFormDoctor
            .get('otherConditions.otherSignificantConditionsOther')
            .setValidators([Validators.required]);
        } else {
          this.questionnaireFormDoctor
            .get('otherConditions.otherSignificantConditionsOther')
            .clearValidators();
          this.questionnaireFormDoctor
            .get('otherConditions.otherSignificantConditionsOther')
            .updateValueAndValidity();
        }
      });
  }
  createExposureForm(name: string): FormGroup {
    const form = this.fbStart.group({
      name: [name],
      occupationalExposureChildhood: ['no', Validators.required],
      weeksPerYearOccupational: [''],
      yearsBackOccupational: [''],
      sunscreenFrequencyOccupational: [''],
      hatFrequencyOccupational: [''],
      clothingFrequencyOccupational: [''],
      shadeFrequencyOccupational: [''],
      recreationalExposureChildhood: [false, Validators.required],
      weeksPerYearRecreational: [''],
      yearsBackRecreational: [''],
      sunscreenFrequencyRecreational: [''],
      hatFrequencyRecreational: [''],
      clothingFrequencyRecreational: [''],
      shadeFrequencyRecreational: [''],
      intentionalExposureChildhood: [false, Validators.required],
      weeksPerYearIntentional: [''],
      yearsBackIntentional: [''],
      sunscreenFrequencyIntentional: [''],
      hatFrequencyIntentional: [''],
      clothingFrequencyIntentional: [''],
      shadeFrequencyIntentional: [''],
    });
    const setConditionalValidators = (
      checkboxName: string,
      fields: string[]
    ) => {
      const checkbox = form.get(checkboxName);
      checkbox!.valueChanges.subscribe((checked) => {
        console.log(checked);

        fields.forEach((fieldName) => {
          const field = form.get(fieldName);
          if (checked) {
            field!.setValidators(
              [
                Validators.required,
                fieldName.includes('weeks') || fieldName.includes('years')
                  ? Validators.min(1)
                  : null,
              ].filter(Boolean) as any
            );
          } else {
            field!.clearValidators();
          }
          field!.updateValueAndValidity();
        });
      });
    };

    setConditionalValidators('occupationalExposureChildhood', [
      'weeksPerYearOccupational',
      'yearsBackOccupational',
      'sunscreenFrequencyOccupational',
      'hatFrequencyOccupational',
      'clothingFrequencyOccupational',
      'shadeFrequencyOccupational',
    ]);

    setConditionalValidators('recreationalExposureChildhood', [
      'weeksPerYearRecreational',
      'yearsBackRecreational',
      'sunscreenFrequencyRecreational',
      'hatFrequencyRecreational',
      'clothingFrequencyRecreational',
      'shadeFrequencyRecreational',
    ]);

    setConditionalValidators('intentionalExposureChildhood', [
      'weeksPerYearIntentional',
      'yearsBackIntentional',
      'sunscreenFrequencyIntentional',
      'hatFrequencyIntentional',
      'clothingFrequencyIntentional',
      'shadeFrequencyIntentional',
    ]);

    return form;
  }
  childFormsValidation: { [key: string]: boolean } = {};

  onChildFormValidation(event: { valid: boolean; formName: string }) {
    this.childFormsValidation[event.formName] = event.valid;
  }
  nextPage() {
    // Provjeri validaciju za current page
    if (this.currentPage >= 5 && this.currentPage <= 10 && !this.data) {
      const formNames = ['012', '1319', '2040', '4060', '6080', '80plus'];
      const currentFormName = formNames[this.currentPage - 5];

      if (!this.childFormsValidation[currentFormName]) {
        this.toster.error(
          'Niste popunili sva obavezna polja u ovom delu upitnika!'
        );
        // return;
      }
    } else {
      // postojeća validacija za ostale forme
      const currentForm = this.formsMap[this.currentPage];
      if (currentForm && currentForm.invalid && !this.data) {
        currentForm.markAllAsTouched();
        this.toster.error(
          'Niste popunili sva obavezna polja u ovom delu upitnika!'
        );
        // return;
      }
    }

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
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.get(key)?.disable();
    });
  }

  ngOnInit() {
    let user_help = sessionStorage.getItem('auth-user');
    if (sessionStorage.getItem('012')) sessionStorage.removeItem('012');
    if (sessionStorage.getItem('1319')) sessionStorage.removeItem('1319');
    if (sessionStorage.getItem('2040')) sessionStorage.removeItem('2040');
    if (sessionStorage.getItem('4060')) sessionStorage.removeItem('4060');
    if (sessionStorage.getItem('6080')) sessionStorage.removeItem('6080');
    if (sessionStorage.getItem('80plus')) sessionStorage.removeItem('80plus');
    if (user_help) {
      this.user = JSON.parse(user_help);
      if (this.user.userType == 'Patient') {
        //takodje, sakrivamo onaj deo koji popunjava doktor
        this.questionnaireFormStart.get('date').clearValidators();
        this.questionnaireFormStart.get('date').updateValueAndValidity();
        this.totalPages = 11;
      } else {
        this.loadQuestionnaireData();
        this.loadDoctorNotes();
        this.disableFormFields(this.questionnaireFormStart);
        this.disableFormFields(this.questionnaireFormEnd);
        if (this.user.userType == 'Admin') {
          this.disableFormFields(this.questionnaireFormDoctor);
        }
        //prikazujemo deo koji popunjava doktor.
      }
    } else this.user = {};
    this.formsMap = {
      4: this.questionnaireFormStart,
      5: this.form012,
      6: this.form1319,
      7: this.form2040,
      8: this.form4060,
      9: this.form6080,
      10: this.form80plus,
      11: this.questionnaireFormEnd,
      13: this.questionnaireFormDoctor,
    };
  }

  loadQuestionnaireData() {
    this.doctorService
      .GetQuestionnairesById(this.data.questionnaireId)
      .subscribe((response: any) => {
        if (
          response.success &&
          response.resultList &&
          response.resultList.length > 0
        ) {
          this.loadedQuestionnaireData = response.resultList[0];
          this.populateFormsWithData(this.loadedQuestionnaireData);
        }
      });
  }

  loadDoctorNotes() {
    this.doctorService
      .GetDoctorNotesByQuestionnaireId(this.data.questionnaireId)
      .subscribe({
        next: (response: any) => {
          if (response.success && response.resultList) {
            this.doctorNotesExists = true;
            this.showSubmitButton = false;
            this.populateDoctorForm(response.resultList[0]);
            this.disableFormFields(this.questionnaireFormDoctor);
          } else {
            this.doctorNotesExists = false;
            this.showSubmitButton = this.user.userType === 'Doctor';
          }
        },
        error: (error) => {
          console.error('Error loading doctor notes:', error);
          this.doctorNotesExists = false;
          this.showSubmitButton = this.user.userType === 'Doctor';
        },
      });
  }

  populateDoctorForm(data: any) {
    console.log(data);

    this.questionnaireFormDoctor.patchValue({
      patientPurpose: data.patient_purpose,
      otherPurpose: data.other_purpose || '',
      familyHistoryMelanoma: data.family_history_melanoma,
      familyHistoryNonMelanoma: data.family_history_non_melanoma,
      personalHistoryMelanoma: {
        history: data.personal_history_melanoma,
        count: data.melanoma_count,
      },
      personalHistoryCarcinoma: {
        history: data.personal_history_carcinoma,
        bccCount: data.bcc_count,
        sccCount: data.scc_count,
        otherDescription: data.other_carcinoma_description,
      },
      skinExaminationToday: data.skin_examination_today,
      dermoscopyPerformed: data.dermoscopy_performed ? 'yes' : 'no',
      nevusCount: data.nevus_count,
      nevusOnHands: data.more_than_twenty_nevus_on_hands ? 'yes' : 'no',
      atypicalNeviPresence: {
        presence: data.atypical_nevi_presence ? 'yes' : 'no',
        count: data.atypical_nevi_count,
      },
      congenitalNevi: {
        mediumSize: data.congenital_nevi_medium_size ? 'yes' : 'no',
        mediumLocation: data.congenital_nevi_medium_location,
        giantSize: data.congenital_nevi_giant_size ? 'yes' : 'no',
        giantLocation: data.congenital_nevi_giant_location,
      },
      solarLentigo: data.solar_lentigo ? 'yes' : 'no',
      suspiciousLesions: {
        melanoma: data.suspicious_melanoma ? 'yes' : 'no',
        melanomaCount: data.suspicious_melanoma_count,
        melanomaDetectedBy: data.melanoma_detected_by,
        bcc: data.suspicious_bcc ? 'yes' : 'no',
        bccCount: data.suspicious_bcc_count,
        bccDetectedBy: data.bcc_detected_by,
        scc: data.suspicious_scc ? 'yes' : 'no',
        sccCount: data.suspicious_scc_count,
        sccDetectedBy: data.scc_detected_by,
        actinicKeratosis: data.actinic_keratosis ? 'yes' : 'no',
        actinicKeratosisCount: data.actinic_keratosis_number,
        actinicKeratosisDetectedBy: data.actinic_keratosis_detected_by,
        exactActinicKeratosisCount: data.actinic_keratosis_count,
        otherLesions: data.other_lesions ? 'yes' : 'no',
        otherLesionsDescription: data.other_lesions_description,
      },
      otherConditions: {
        hematological: data.hematological_decease ? 'yes' : 'no',
        hiv: data.hiv_decease ? 'yes' : 'no',
        immunosuppression: data.other_immunosuppresion ? 'yes' : 'no',
        immunosuppressionOther: data.other_immunosuppresion_reason,
        otherSignificantConditions: data.other_deceases ? 'yes' : 'no',
        otherSignificantConditionsOther: data.other_deceases_name,
      },
      smoking: data.smoking ? 'yes' : 'no',
      exSmoker: data.ex_smoker ? 'yes' : 'no',
    });
  }

  populateFormsWithData(data: any) {
    this.questionnaireFormStart.patchValue({
      gender: data.gender,
      birthYear: data.birth_year,
      birthPlace: data.birth_place,
      residence: data.residence,
      weight: data.weight,
      height: data.height,
      ethnicity: data.ethnicity,
      otherEthnicity: data.other_ethnicity,
      educationLevel: data.education_level,
      livingAlone: data.living_alone,
      reasonForComing: data.reason_exam,
      fullBodyCheck: data.full_body_check_done,
      hairColor: data.hair_color,
      freckles: data.how_much_freckles,
      sunReaction: data.sun_reaction,
    });

    this.questionnaireFormEnd.patchValue({
      tanningExposure: data.tanning_exposure,
      sunnyCountryExposure: {
        exposure: data.sunny_country_exposure,
        yearsBefore18: data.years_before_18,
        locationBefore18: data.location_before_18,
        yearsAfter18: data.years_after_18,
        locationAfter18: data.location_after_18,
      },
      solariumUse: {
        usedSolarium: data.used_solarium,
        totalVisits: data.total_visits,
        firstVisitAge: data.first_visit_age,
        lastVisitAge: data.last_visit_age,
      },
      sunburns: {
        childhood: data.had_childhood_burns,
        adolescence: data.had_adolescence_burns,
        between20and40: data.had_burns_between_20_40,
        between40and60: data.had_burns_between_40_60,
        between60and80: data.had_burns_between_60_80,
        after80: data.had_burns_after_80,
      },
    });

    // Popuni exposure forme
    this.populateExposureForm(this.form012, data.sunExposureFromAge0to12);
    this.populateExposureForm(this.form1319, data.sunExposureFromAge13to19);
    this.populateExposureForm(this.form2040, data.sunExposureFromAge20to40);
    this.populateExposureForm(this.form4060, data.sunExposureFromAge40to60);
    this.populateExposureForm(this.form6080, data.sunExposureFromAge60to80);
    this.populateExposureForm(this.form80plus, data.sunExposureAfterAge80);
  }

  populateExposureForm(form: FormGroup, exposureDataString: string) {
    try {
      const exposureData = JSON.parse(exposureDataString);

      // Pronađi objekte po tipu exposure-a
      const occupational = exposureData.find(
        (item: any) => item.name === 'occupational_exposure'
      );
      const recreational = exposureData.find(
        (item: any) => item.name === 'recreational_exposure'
      );
      const intentional = exposureData.find(
        (item: any) => item.name === 'intentional_exposure'
      );

      if (occupational) {
        form.patchValue({
          occupationalExposureChildhood: occupational.info.exposed, // ili occupational.info.exposed === 'yes'
          weeksPerYearOccupational: occupational.info.weeksPerYear,
          yearsBackOccupational: occupational.info.yearsBack,
          sunscreenFrequencyOccupational: occupational.info.sunscreenFrequency,
          hatFrequencyOccupational: occupational.info.hatFrequency,
          clothingFrequencyOccupational: occupational.info.clothingFrequency,
          shadeFrequencyOccupational: occupational.info.shadeFrequency,
        });
      }

      if (recreational) {
        form.patchValue({
          recreationalExposureChildhood: recreational.info.exposed, // ili recreational.info.exposed === 'yes'
          weeksPerYearRecreational: recreational.info.weeksPerYear,
          yearsBackRecreational: recreational.info.yearsBack,
          sunscreenFrequencyRecreational: recreational.info.sunscreenFrequency,
          hatFrequencyRecreational: recreational.info.hatFrequency,
          clothingFrequencyRecreational: recreational.info.clothingFrequency,
          shadeFrequencyRecreational: recreational.info.shadeFrequency,
        });
      }

      if (intentional) {
        form.patchValue({
          intentionalExposureChildhood: intentional.info.exposed, // ili intentional.info.exposed === 'yes'
          weeksPerYearIntentional: intentional.info.weeksPerYear,
          yearsBackIntentional: intentional.info.yearsBack,
          sunscreenFrequencyIntentional: intentional.info.sunscreenFrequency,
          hatFrequencyIntentional: intentional.info.hatFrequency,
          clothingFrequencyIntentional: intentional.info.clothingFrequency,
          shadeFrequencyIntentional: intentional.info.shadeFrequency,
        });
      }

      console.log(form.controls);
    } catch (error) {
      console.error('Error parsing exposure data:', error);
    }
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

    if (this.user.userType == 'Patient') {
      if (
        !this.questionnaireFormStart.valid ||
        !this.questionnaireFormEnd.valid ||
        !this.form012.valid ||
        !this.form1319.valid ||
        !this.form2040.valid ||
        !this.form4060.valid ||
        !this.form6080.valid ||
        !this.form80plus.valid
      ) {
        this.toster.error('Niste popunili sva polja!');
        return;
      } else {
        // salji za pacijenta.
        //kreira se questionnaire i QuestionnaireDataPatient
        const formData: any = {
          patientId: this.user.id,
          date: null,
          consent: this.questionnaireFormStart.get('consent').value,
          gender: this.questionnaireFormStart.get('gender').value,
          birthYear: this.questionnaireFormStart.get('birthYear').value,
          birthPlace: this.questionnaireFormStart.get('birthPlace').value,
          residence: this.questionnaireFormStart.get('residence').value,
          weight: this.questionnaireFormStart.get('weight').value,
          height: this.questionnaireFormStart.get('height').value,
          ethnicity: this.questionnaireFormStart.get('ethnicity').value,
          otherEthnicity:
            this.questionnaireFormStart.get('otherEthnicity').value,
          educationLevel:
            this.questionnaireFormStart.get('educationLevel').value,
          livingAlone: this.questionnaireFormStart.get('livingAlone').value,
          reasonForComing:
            this.questionnaireFormStart.get('reasonForComing').value,
          fullBodyCheck: this.questionnaireFormStart.get('fullBodyCheck').value,
          hairColor: this.questionnaireFormStart.get('hairColor').value,
          freckles: this.questionnaireFormStart.get('freckles').value,
          sunReaction: this.questionnaireFormStart.get('sunReaction').value,

          tanningExposure:
            this.questionnaireFormEnd.get('tanningExposure').value,
          sunnyCountryExposure: {
            exposure: this.questionnaireFormEnd
              .get('sunnyCountryExposure')
              .get('exposure').value,
            yearsBefore18: this.questionnaireFormEnd
              .get('sunnyCountryExposure')
              .get('yearsBefore18').value,
            locationBefore18: this.questionnaireFormEnd
              .get('sunnyCountryExposure')
              .get('locationBefore18').value,
            yearsAfter18: this.questionnaireFormEnd
              .get('sunnyCountryExposure')
              .get('yearsAfter18').value,
            locationAfter18: this.questionnaireFormEnd
              .get('sunnyCountryExposure')
              .get('locationAfter18').value,
          },
          solariumUse: {
            usedSolarium: this.questionnaireFormEnd
              .get('solariumUse')
              .get('usedSolarium').value,
            totalVisits: this.questionnaireFormEnd
              .get('solariumUse')
              .get('totalVisits').value,
            firstVisitAge: this.questionnaireFormEnd
              .get('solariumUse')
              .get('firstVisitAge').value,
            lastVisitAge: this.questionnaireFormEnd
              .get('solariumUse')
              .get('lastVisitAge').value,
          },
          sunburns: {
            childhood: this.questionnaireFormEnd
              .get('sunburns')
              .get('childhood').value,
            adolescence: this.questionnaireFormEnd
              .get('sunburns')
              .get('adolescence').value,
            between20and40: this.questionnaireFormEnd
              .get('sunburns')
              .get('between20and40').value,
            between40and60: this.questionnaireFormEnd
              .get('sunburns')
              .get('between40and60').value,
            between60and80: this.questionnaireFormEnd
              .get('sunburns')
              .get('between60and80').value,
            after80: this.questionnaireFormEnd.get('sunburns').get('after80')
              .value,
          },

          sunExposureFromAge0to12: this.convertToExposureArray(this.form012),
          sunExposureFromAge13to19: this.convertToExposureArray(this.form1319),
          sunExposureFromAge20to40: this.convertToExposureArray(this.form2040),
          sunExposureFromAge40to60: this.convertToExposureArray(this.form4060),
          sunExposureFromAge60to80: this.convertToExposureArray(this.form6080),
          sunExposureAfterAge80: this.convertToExposureArray(this.form80plus),
        };

        // Slanje podataka backend-u
        this.patientService
          .insertPatientData(formData)
          .subscribe((response: any) => {
            if (response.success) {
              this.toster.success('Podaci uspešno uneti!');
              //vrati ti ceo upitnik, znaci imamo ID i Score
              const dialogRef = this.dialog.open(ExaminationResultsComponent, {
                width: '610px',
                data: {
                  patientId: this.user.id,
                  score: response.result.score,
                  id: response.result.id,
                },
              });
              this.dialogRef.afterClosed().subscribe(() => {
                window.location.reload();
              });
            } else {
              this.toster.error('Greška pri slanju podataka', 'Oprez!');
            }
          });
      }
    } else {
      if (!this.questionnaireFormDoctor.valid) {
        this.toster.error('Niste popunili sva polja!');
        return;
      } else {
        // Kreiraj model koji odgovara backend DTO strukturi
        let model = {
          questionnaireID: this.data.questionnaireId,

          // Basic patient info
          patientPurpose:
            this.questionnaireFormDoctor.get('patientPurpose')?.value,

          // Family history
          familyHistoryMelanoma: this.questionnaireFormDoctor.get(
            'familyHistoryMelanoma'
          )?.value,
          familyHistoryNonMelanoma: this.questionnaireFormDoctor.get(
            'familyHistoryNonMelanoma'
          )?.value,

          // Personal history melanoma
          personalHistoryMelanoma: this.questionnaireFormDoctor.get(
            'personalHistoryMelanoma.history'
          )?.value,
          melanomaCount:
            this.questionnaireFormDoctor.get('personalHistoryMelanoma.history')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'personalHistoryMelanoma.count'
                )?.value
              : 0,

          // Personal history carcinoma
          personalHistoryCarcinoma: this.questionnaireFormDoctor.get(
            'personalHistoryCarcinoma.history'
          )?.value,
          bccCount:
            this.questionnaireFormDoctor.get('personalHistoryCarcinoma.history')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'personalHistoryCarcinoma.bccCount'
                )?.value
              : 0,
          sccCount:
            this.questionnaireFormDoctor.get('personalHistoryCarcinoma.history')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'personalHistoryCarcinoma.sccCount'
                )?.value
              : 0,
          otherCarcinomaDescription:
            this.questionnaireFormDoctor.get('personalHistoryCarcinoma.history')
              ?.value === 'other'
              ? this.questionnaireFormDoctor.get(
                  'personalHistoryCarcinoma.otherDescription'
                )?.value
              : '',

          // Skin examination
          skinExaminationToday: this.questionnaireFormDoctor.get(
            'skinExaminationToday'
          )?.value,
          dermoscopyPerformed:
            this.questionnaireFormDoctor.get('dermoscopyPerformed')?.value ===
            'yes',

          // Nevus information
          nevusCount: this.questionnaireFormDoctor.get('nevusCount')?.value,
          moreThanTwentyNevusOnHands:
            this.questionnaireFormDoctor.get('nevusOnHands')?.value === 'yes',

          // Atypical nevi
          atypicalNeviPresence:
            this.questionnaireFormDoctor.get('atypicalNeviPresence.presence')
              ?.value === 'yes',
          atypicalNeviCount:
            this.questionnaireFormDoctor.get('atypicalNeviPresence.presence')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get('atypicalNeviPresence.count')
                  ?.value
              : 0,

          // Congenital nevi
          congenitalNeviMediumSize:
            this.questionnaireFormDoctor.get('congenitalNevi.mediumSize')
              ?.value === 'yes',
          congenitalNeviMediumLocation:
            this.questionnaireFormDoctor.get('congenitalNevi.mediumSize')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'congenitalNevi.mediumLocation'
                )?.value
              : '',
          congenitalNeviGiantSize:
            this.questionnaireFormDoctor.get('congenitalNevi.giantSize')
              ?.value === 'yes',
          congenitalNeviGiantLocation:
            this.questionnaireFormDoctor.get('congenitalNevi.giantSize')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get('congenitalNevi.giantLocation')
                  ?.value
              : '',

          // Solar lentigo
          solarLentigo:
            this.questionnaireFormDoctor.get('solarLentigo')?.value === 'yes',

          // Suspicious lesions - Melanoma
          suspiciousMelanoma:
            this.questionnaireFormDoctor.get('suspiciousLesions.melanoma')
              ?.value === 'yes',
          suspiciousMelanomaCount:
            this.questionnaireFormDoctor.get('suspiciousLesions.melanoma')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'suspiciousLesions.melanomaCount'
                )?.value
              : null,
          melanomaDetectedBy:
            this.questionnaireFormDoctor.get('suspiciousLesions.melanoma')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'suspiciousLesions.melanomaDetectedBy'
                )?.value
              : '',

          // Suspicious lesions - BCC
          suspiciousBcc:
            this.questionnaireFormDoctor.get('suspiciousLesions.bcc')?.value ===
            'yes',
          suspiciousBccCount:
            this.questionnaireFormDoctor.get('suspiciousLesions.bcc')?.value ===
            'yes'
              ? this.questionnaireFormDoctor.get('suspiciousLesions.bccCount')
                  ?.value
              : 0,
          bccDetectedBy:
            this.questionnaireFormDoctor.get('suspiciousLesions.bcc')?.value ===
            'yes'
              ? this.questionnaireFormDoctor.get(
                  'suspiciousLesions.bccDetectedBy'
                )?.value
              : '',

          // Suspicious lesions - SCC
          suspiciousScc:
            this.questionnaireFormDoctor.get('suspiciousLesions.scc')?.value ===
            'yes',
          suspiciousSccCount:
            this.questionnaireFormDoctor.get('suspiciousLesions.scc')?.value ===
            'yes'
              ? this.questionnaireFormDoctor.get('suspiciousLesions.sccCount')
                  ?.value
              : 0,
          sccDetectedBy:
            this.questionnaireFormDoctor.get('suspiciousLesions.scc')?.value ===
            'yes'
              ? this.questionnaireFormDoctor.get(
                  'suspiciousLesions.sccDetectedBy'
                )?.value
              : '',

          // Actinic keratosis
          actinicKeratosis:
            this.questionnaireFormDoctor.get(
              'suspiciousLesions.actinicKeratosis'
            )?.value === 'yes',
          actinicKeratosisNumber:
            this.questionnaireFormDoctor.get(
              'suspiciousLesions.actinicKeratosis'
            )?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'suspiciousLesions.actinicKeratosisCount'
                )?.value
              : '',
          actinicKeratosisCount:
            this.questionnaireFormDoctor.get(
              'suspiciousLesions.actinicKeratosisCount'
            )?.value === '<10'
              ? this.questionnaireFormDoctor.get(
                  'suspiciousLesions.exactActinicKeratosisCount'
                )?.value
              : 0,
          actinicKeratosisDetectedBy:
            this.questionnaireFormDoctor.get(
              'suspiciousLesions.actinicKeratosis'
            )?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'suspiciousLesions.actinicKeratosisDetectedBy'
                )?.value
              : '',

          // Other lesions
          otherLesions:
            this.questionnaireFormDoctor.get('suspiciousLesions.otherLesions')
              ?.value === 'yes',
          otherLesionsDescription:
            this.questionnaireFormDoctor.get('suspiciousLesions.otherLesions')
              ?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'suspiciousLesions.otherLesionsDescription'
                )?.value
              : '',

          // Other conditions
          hematologicalDecease:
            this.questionnaireFormDoctor.get('otherConditions.hematological')
              ?.value === 'yes',
          hivDecease:
            this.questionnaireFormDoctor.get('otherConditions.hiv')?.value ===
            'yes',
          otherImmunosuppresion:
            this.questionnaireFormDoctor.get(
              'otherConditions.immunosuppression'
            )?.value === 'yes',
          otherImmunosuppresionReason:
            this.questionnaireFormDoctor.get(
              'otherConditions.immunosuppression'
            )?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'otherConditions.immunosuppressionOther'
                )?.value
              : '',
          otherDeceases:
            this.questionnaireFormDoctor.get(
              'otherConditions.otherSignificantConditions'
            )?.value === 'yes',
          otherDeceasesName:
            this.questionnaireFormDoctor.get(
              'otherConditions.otherSignificantConditions'
            )?.value === 'yes'
              ? this.questionnaireFormDoctor.get(
                  'otherConditions.otherSignificantConditionsOther'
                )?.value
              : '',

          // Smoking
          smoking: this.questionnaireFormDoctor.get('smoking')?.value === 'yes',
          exSmoker:
            this.questionnaireFormDoctor.get('smoking')?.value === 'no'
              ? this.questionnaireFormDoctor.get('exSmoker')?.value === 'yes'
              : null,
        };

        console.log('Slanje podataka:', model);

        this.doctorService.AddDoctorNotes(model).subscribe({
          next: (res: any) => {
            if (res.success) {
              this.toster.success('Podaci su uspešno uneti.', 'Čestitke!');
              this.dialogRef.close(true);
            }
          },
          error: (error) => {
            console.error('Error sending doctor notes:', error);
            this.toster.error('Greška pri slanju podataka');
          },
        });
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
          sunscreenFrequency: formGroup.get('sunscreenFrequencyOccupational')
            ?.value,
          hatFrequency: formGroup.get('hatFrequencyOccupational')?.value,
          clothingFrequency: formGroup.get('clothingFrequencyOccupational')
            ?.value,
          shadeFrequency: formGroup.get('shadeFrequencyOccupational')?.value,
        },
      },
      {
        name: 'recreational_exposure',
        info: {
          exposed: formGroup.get('recreationalExposureChildhood')?.value,
          weeksPerYear: formGroup.get('weeksPerYearRecreational')?.value,
          yearsBack: formGroup.get('yearsBackRecreational')?.value,
          sunscreenFrequency: formGroup.get('sunscreenFrequencyRecreational')
            ?.value,
          hatFrequency: formGroup.get('hatFrequencyRecreational')?.value,
          clothingFrequency: formGroup.get('clothingFrequencyRecreational')
            ?.value,
          shadeFrequency: formGroup.get('shadeFrequencyRecreational')?.value,
        },
      },
      {
        name: 'intentional_exposure',
        info: {
          exposed: formGroup.get('intentionalExposureChildhood')?.value,
          weeksPerYear: formGroup.get('weeksPerYearIntentional')?.value,
          yearsBack: formGroup.get('yearsBackIntentional')?.value,
          sunscreenFrequency: formGroup.get('sunscreenFrequencyIntentional')
            ?.value,
          hatFrequency: formGroup.get('hatFrequencyIntentional')?.value,
          clothingFrequency: formGroup.get('clothingFrequencyIntentional')
            ?.value,
          shadeFrequency: formGroup.get('shadeFrequencyIntentional')?.value,
        },
      },
    ]);
  }

  krajForme() {
    this.currentPage = this.totalPages;
  }
}
