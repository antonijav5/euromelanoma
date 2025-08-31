import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

interface AgeRangeForm {
  [key: string]: FormGroup;
}

@Component({
  selector: 'app-age-difference-exposure',
  templateUrl: './age-difference-exposure.component.html',
  styleUrl: './age-difference-exposure.component.css',
})
export class AgeDifferenceExposureComponent
  implements OnInit, OnChanges, OnDestroy
{
  user: any = {};
  currentForm: FormGroup | null = null;
  private subscriptions: Subscription[] = [];

  // Organizuj forme u objekat
  private forms: AgeRangeForm = {};

  @Input() currPage: number = 5;
  @Input() exposureData: any = null;
  @Output() newItemEvent = new EventEmitter<any>();
  @Output() formValidationEvent = new EventEmitter<{
    valid: boolean;
    formName: string;
  }>();

  constructor(private fb: FormBuilder, private toster: ToastrService) {
    this.initializeForms();
  }

  private initializeForms() {
    const ageRanges = ['012', '1319', '2040', '4060', '6080', '80plus'];
    ageRanges.forEach((range) => {
      this.forms[range] = this.createAgeRangeForm(range);
    });
  }

  private createAgeRangeForm(name: string): FormGroup {
    return this.fb.group({
      name: [name],
      occupationalExposureChildhood: ['no', Validators.required],
      recreationalExposureChildhood: ['no', Validators.required],
      intentionalExposureChildhood: ['no', Validators.required],

      weeksPerYearOccupational: [''],
      yearsBackOccupational: [''],
      sunscreenFrequencyOccupational: [''],
      hatFrequencyOccupational: [''],
      clothingFrequencyOccupational: [''],
      shadeFrequencyOccupational: [''],

      weeksPerYearRecreational: [''],
      yearsBackRecreational: [''],
      sunscreenFrequencyRecreational: [''],
      hatFrequencyRecreational: [''],
      clothingFrequencyRecreational: [''],
      shadeFrequencyRecreational: [''],

      weeksPerYearIntentional: [''],
      yearsBackIntentional: [''],
      sunscreenFrequencyIntentional: [''],
      hatFrequencyIntentional: [''],
      clothingFrequencyIntentional: [''],
      shadeFrequencyIntentional: [''],
    });
  }

  ngOnInit() {
    this.loadUser();
    this.handleUserPermissions();
    this.loadSavedData();
    if (this.exposureData) {
      this.populateFormsWithData();
    }
    this.switchPages();
  }

  private loadUser() {
    const userSession = sessionStorage.getItem('auth-user');
    if (userSession) {
      this.user = JSON.parse(userSession);
    }
  }

  private handleUserPermissions() {
    if (this.user.userType === 'Doctor' || this.user.userType === 'Admin') {
      Object.values(this.forms).forEach((form) => {
        this.disableFormFields(form);
      });
    }
  }

  private loadSavedData() {
    Object.keys(this.forms).forEach((key) => {
      const savedData = sessionStorage.getItem(key);
      if (savedData) {
        this.forms[key].patchValue(JSON.parse(savedData));

        this.applyValidatorsBasedOnSavedData(this.forms[key]);
      }
    });
  }
  private populateFormsWithData() {
    console.log(this.exposureData);

    if (!this.exposureData) return;

    const dataMap = {
      '012': this.exposureData.sunExposureFromAge0to12,
      '1319': this.exposureData.sunExposureFromAge13to19,
      '2040': this.exposureData.sunExposureFromAge20to40,
      '4060': this.exposureData.sunExposureFromAge40to60,
      '6080': this.exposureData.sunExposureFromAge60to80,
      '80plus': this.exposureData.sunExposureAfterAge80,
    };
    type FormKeys = '012' | '1319' | '2040' | '4060' | '6080' | '80plus';

    Object.keys(dataMap).forEach((key) => {
      const typedKey = key as FormKeys;
      console.log({ dataMap, typedKey });

      if (dataMap[typedKey] && this.forms[typedKey]) {
        this.populateExposureForm(this.forms[typedKey], dataMap[typedKey]);
      }
    });
  }

  private populateExposureForm(form: FormGroup, exposureDataString: string) {
    try {
      const exposureData = JSON.parse(exposureDataString);

      const occupational = exposureData.find(
        (item: any) => item.name === 'occupational_exposure'
      );
      const recreational = exposureData.find(
        (item: any) => item.name === 'recreational_exposure'
      );
      const intentional = exposureData.find(
        (item: any) => item.name === 'intentional_exposure'
      );
      console.log(exposureData);

      if (occupational) {
        form.patchValue({
          occupationalExposureChildhood: occupational.info.exposed,
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
          recreationalExposureChildhood: recreational.info.exposed,
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
          intentionalExposureChildhood: intentional.info.exposed,
          weeksPerYearIntentional: intentional.info.weeksPerYear,
          yearsBackIntentional: intentional.info.yearsBack,
          sunscreenFrequencyIntentional: intentional.info.sunscreenFrequency,
          hatFrequencyIntentional: intentional.info.hatFrequency,
          clothingFrequencyIntentional: intentional.info.clothingFrequency,
          shadeFrequencyIntentional: intentional.info.shadeFrequency,
        });
      }
    } catch (error) {
      console.error('Error parsing exposure data:', error);
    }
  }

  private applyValidatorsBasedOnSavedData(form: FormGroup) {
    const occupationalValue = form.get('occupationalExposureChildhood')?.value;
    if (occupationalValue === 'yes') {
      this.setValidatorsForForm(form, 'occupational');
    }

    const recreationalValue = form.get('recreationalExposureChildhood')?.value;
    if (recreationalValue === 'yes') {
      this.setValidatorsForForm(form, 'recreational');
    }

    const intentionalValue = form.get('intentionalExposureChildhood')?.value;
    if (intentionalValue === 'yes') {
      this.setValidatorsForForm(form, 'intentional');
    }
  }

  private disableFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      formGroup.get(key)?.disable();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentForm) {
      sessionStorage.setItem(
        this.currentForm.value.name,
        JSON.stringify(this.currentForm.value)
      );

      this.newItemEvent.emit(this.currentForm);
      this.checkFormValidation();
    }
    this.switchPages();
  }

  switchPages() {
    this.unsubscribeFromCurrentForm();

    const ageRanges = ['012', '1319', '2040', '4060', '6080', '80plus'];
    const formKey = ageRanges[this.currPage - 5];

    if (formKey && this.forms[formKey]) {
      this.currentForm = this.forms[formKey];
      this.setupCurrentFormValidation();
    }
  }

  private setupCurrentFormValidation() {
    if (!this.currentForm) return;

    // Subscribe to occupational exposure changes
    this.subscriptions.push(
      this.currentForm
        .get('occupationalExposureChildhood')!
        .valueChanges.subscribe((value: any) => {
          if (value === 'yes') {
            this.setValidatorsGroup('occupational');
          } else {
            this.clearValidatorsGroup('occupational');
          }
        })
    );

    this.subscriptions.push(
      this.currentForm
        .get('recreationalExposureChildhood')!
        .valueChanges.subscribe((value: any) => {
          if (value === 'yes') {
            this.setValidatorsGroup('recreational');
          } else {
            this.clearValidatorsGroup('recreational');
          }
        })
    );

    this.subscriptions.push(
      this.currentForm
        .get('intentionalExposureChildhood')!
        .valueChanges.subscribe((value: any) => {
          if (value === 'yes') {
            this.setValidatorsGroup('intentional');
          } else {
            this.clearValidatorsGroup('intentional');
          }
        })
    );

    this.subscriptions.push(
      this.currentForm.valueChanges.subscribe(() => {
        this.checkFormValidation();
      })
    );
  }

  private unsubscribeFromCurrentForm() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
  }

  private setValidatorsGroup(
    type: 'occupational' | 'recreational' | 'intentional'
  ) {
    if (!this.currentForm) return;
    this.setValidatorsForForm(this.currentForm, type);
  }

  private setValidatorsForForm(
    form: FormGroup,
    type: 'occupational' | 'recreational' | 'intentional'
  ) {
    const fields = [
      `weeksPerYear${this.capitalize(type)}`,
      `yearsBack${this.capitalize(type)}`,
      `sunscreenFrequency${this.capitalize(type)}`,
      `hatFrequency${this.capitalize(type)}`,
      `clothingFrequency${this.capitalize(type)}`,
      `shadeFrequency${this.capitalize(type)}`,
    ];

    fields.forEach((fieldName) => {
      const field = form.get(fieldName);
      if (field) {
        if (
          fieldName.includes('weeksPerYear') ||
          fieldName.includes('yearsBack')
        ) {
          field.setValidators([Validators.required, Validators.min(1)]);
        } else {
          field.setValidators(Validators.required);
        }
        field.updateValueAndValidity();
      }
    });
  }

  private clearValidatorsGroup(
    type: 'occupational' | 'recreational' | 'intentional'
  ) {
    if (!this.currentForm) return;

    const fields = [
      `weeksPerYear${this.capitalize(type)}`,
      `yearsBack${this.capitalize(type)}`,
      `sunscreenFrequency${this.capitalize(type)}`,
      `hatFrequency${this.capitalize(type)}`,
      `clothingFrequency${this.capitalize(type)}`,
      `shadeFrequency${this.capitalize(type)}`,
    ];

    fields.forEach((fieldName) => {
      const field = this.currentForm!.get(fieldName);
      if (field) {
        field.clearValidators();
        field.updateValueAndValidity();
      }
    });
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private checkFormValidation() {
    if (!this.currentForm) return;

    const isValid = this.currentForm.valid;
    const formName = this.currentForm.get('name')?.value;

    this.formValidationEvent.emit({
      valid: isValid,
      formName: formName,
    });
  }

  getHeadline(): string {
    const headlines: { [key: number]: string } = {
      5: 'TOKOM DETINJSTVA (0 to 12 god)',
      6: 'TOKOM PERIODA ADOLESCENCIJE (13 to 19 god)',
      7: 'IZMEĐU 20 I 40 GODINA STAROSTI',
      8: 'IZMEĐU 40 I 60 GODINA STAROSTI',
      9: 'IZMEĐU 60 AND 80 GODINA STAROSTI',
      10: 'PREKO 80 GODINA STAROSTI',
    };

    return headlines[this.currPage] || '';
  }

  // Getter methods za backward compatibility
  get questionnaireForm012() {
    return this.forms['012'];
  }

  get questionnaireForm1319() {
    return this.forms['1319'];
  }

  get questionnaireForm2040() {
    return this.forms['2040'];
  }

  get questionnaireForm4060() {
    return this.forms['4060'];
  }

  get questionnaireForm6080() {
    return this.forms['6080'];
  }

  get questionnaireForm80plus() {
    return this.forms['80plus'];
  }

  onSubmit() {
    // Implementation if needed
  }

  ngOnDestroy() {
    this.unsubscribeFromCurrentForm();

    if (this.currentForm) {
      this.currentForm.markAllAsTouched();
      sessionStorage.setItem(
        this.currentForm.value.name,
        JSON.stringify(this.currentForm.value)
      );
    }

    this.newItemEvent.emit(this.currentForm);
  }

  testClick() {
    if (this.currentForm) {
      this.currentForm.markAllAsTouched();
      if (!this.currentForm.valid) {
        this.toster.error('Niste popunili sva polja.');
      }
    }
  }

  // Legacy methods for backward compatibility (if needed)
  setOccupationalValidators() {
    this.setValidatorsGroup('occupational');
  }

  clearOccupationalValidators() {
    this.clearValidatorsGroup('occupational');
  }

  setRecreationalValidators() {
    this.setValidatorsGroup('recreational');
  }

  clearRecreationalValidators() {
    this.clearValidatorsGroup('recreational');
  }

  setIntentionalValidators() {
    this.setValidatorsGroup('intentional');
  }

  clearIntentionalValidators() {
    this.clearValidatorsGroup('intentional');
  }
}
