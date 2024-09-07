import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-age-difference-exposure',
  templateUrl: './age-difference-exposure.component.html',
  styleUrl: './age-difference-exposure.component.css'
})
export class AgeDifferenceExposureComponent implements OnInit, OnChanges, OnDestroy {
// strana 5 : 0-12
// strana 6 : 13-40
// strana 7 : 40-60
// strana 8 : 60-80
// strana 9 : 80+
questionnaireForm012: any;
questionnaireForm1319: any;
questionnaireForm2040: any;
questionnaireForm4060: any;
questionnaireForm6080: any;
questionnaireForm80plus: any;




@Input() currPage:number=5

//@Input()
 form012:any
//@Input()
 form1319:any
//@Input()
 form2040:any
//@Input()
 form4060:any
//@Input() 
form6080:any
//@Input()
form80plus:any


//@Output() 
currentForm:any;
@Output() newItemEvent = new EventEmitter<any>()

constructor(
  private fb012: FormBuilder,
  private toster:ToastrService
){

  this.questionnaireForm012 = this.fb012.group({
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
    this.questionnaireForm1319 = this.fb012.group({
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

  this.questionnaireForm2040 = this.fb012.group({

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


  this.questionnaireForm4060 = this.fb012.group({
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
    
  this.questionnaireForm6080 = this.fb012.group({
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

    
  this.questionnaireForm80plus = this.fb012.group({
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


//     this.questionnaireForm012=this.form012
//     this.questionnaireForm1319=this.form1319
//     this.questionnaireForm2040=this.form2040
// this.questionnaireForm4060=this.form4060
// this.questionnaireForm6080=this.form6080
// this.questionnaireForm80plus=this.form80plus
  }


  ngOnInit() {

    let f012=sessionStorage.getItem("012")

    if (f012) 
      {
        this.questionnaireForm012.patchValue(JSON.parse(f012)); 
      }


      
    let f1319=sessionStorage.getItem("1319")

    if (f1319) 
      {
        this.questionnaireForm1319.patchValue(JSON.parse(f1319)); 
      }


      
    let f2040=sessionStorage.getItem("2040")

    if (f2040) 
      {
        this.questionnaireForm2040.patchValue(JSON.parse(f2040));  
      }


      
    let f4060=sessionStorage.getItem("4060")

    if (f4060) 
      {
        this.questionnaireForm4060.patchValue(JSON.parse(f4060));     
      }


      
    let f6080=sessionStorage.getItem("6080")

    if (f6080) 
      {
        this.questionnaireForm6080.patchValue(JSON.parse(f6080));    
      }

      
    let f80plus=sessionStorage.getItem("80plus")

    if (f80plus) 
      {
        this.questionnaireForm80plus.patchValue(JSON.parse(f80plus));        
      }
    // else this.questionnaireForm012={}
if (this.currentForm){
  this.currentForm.get('occupationalExposureChildhood').valueChanges.subscribe((value:any) => {
    if (value === 'yes') {
      this.setOccupationalValidators();
    } else {
      this.clearOccupationalValidators();
    }
  });

  // Praćenje promene za recreationalExposureChildhood
  this.currentForm.get('recreationalExposureChildhood').valueChanges.subscribe((value:any)  => {
    if (value === 'yes') {
      this.setRecreationalValidators();
    } else {
      this.clearRecreationalValidators();
    }
  });

  // Praćenje promene za intentionalExposureChildhood
  this.currentForm.get('intentionalExposureChildhood').valueChanges.subscribe((value:any)  => {
    if (value === 'yes') {
      this.setIntentionalValidators();
    } else {
      this.clearIntentionalValidators();
    }
  });

}
this.switchPages()

  }

  // Postavljanje validacija za occupational polja
  setOccupationalValidators() {
    this.currentForm.get('weeksPerYearOccupational').setValidators([Validators.required, Validators.min(1)]);
    this.currentForm.get('yearsBackOccupational').setValidators([Validators.required, Validators.min(1)]);
    this.currentForm.get('sunscreenFrequencyOccupational').setValidators(Validators.required);
    this.currentForm.get('hatFrequencyOccupational').setValidators(Validators.required);
    this.currentForm.get('clothingFrequencyOccupational').setValidators(Validators.required);
    this.currentForm.get('shadeFrequencyOccupational').setValidators(Validators.required);

    // Ponovno evaluiranje forme kako bi se primenili validatori
    this.currentForm.get('weeksPerYearOccupational').updateValueAndValidity();
    this.currentForm.get('yearsBackOccupational').updateValueAndValidity();
    this.currentForm.get('sunscreenFrequencyOccupational').updateValueAndValidity();
    this.currentForm.get('hatFrequencyOccupational').updateValueAndValidity();
    this.currentForm.get('clothingFrequencyOccupational').updateValueAndValidity();
    this.currentForm.get('shadeFrequencyOccupational').updateValueAndValidity();
  }

  clearOccupationalValidators() {
    this.currentForm.get('weeksPerYearOccupational').clearValidators();
    this.currentForm.get('yearsBackOccupational').clearValidators();
    this.currentForm.get('sunscreenFrequencyOccupational').clearValidators();
    this.currentForm.get('hatFrequencyOccupational').clearValidators();
    this.currentForm.get('clothingFrequencyOccupational').clearValidators();
    this.currentForm.get('shadeFrequencyOccupational').clearValidators();

    this.currentForm.get('weeksPerYearOccupational').updateValueAndValidity();
    this.currentForm.get('yearsBackOccupational').updateValueAndValidity();
    this.currentForm.get('sunscreenFrequencyOccupational').updateValueAndValidity();
    this.currentForm.get('hatFrequencyOccupational').updateValueAndValidity();
    this.currentForm.get('clothingFrequencyOccupational').updateValueAndValidity();
    this.currentForm.get('shadeFrequencyOccupational').updateValueAndValidity();
  }

  // Slično za rekreativnu izloženost
  setRecreationalValidators() {
    this.currentForm.get('weeksPerYearRecreational').setValidators([Validators.required, Validators.min(1)]);
    this.currentForm.get('yearsBackRecreational').setValidators([Validators.required, Validators.min(1)]);
    this.currentForm.get('sunscreenFrequencyRecreational').setValidators(Validators.required);
    this.currentForm.get('hatFrequencyRecreational').setValidators(Validators.required);
    this.currentForm.get('clothingFrequencyRecreational').setValidators(Validators.required);
    this.currentForm.get('shadeFrequencyRecreational').setValidators(Validators.required);

    this.currentForm.get('weeksPerYearRecreational').updateValueAndValidity();
    this.currentForm.get('yearsBackRecreational').updateValueAndValidity();
    this.currentForm.get('sunscreenFrequencyRecreational').updateValueAndValidity();
    this.currentForm.get('hatFrequencyRecreational').updateValueAndValidity();
    this.currentForm.get('clothingFrequencyRecreational').updateValueAndValidity();
    this.currentForm.get('shadeFrequencyRecreational').updateValueAndValidity();
  }

  clearRecreationalValidators() {
    this.currentForm.get('weeksPerYearRecreational').clearValidators();
    this.currentForm.get('yearsBackRecreational').clearValidators();
    this.currentForm.get('sunscreenFrequencyRecreational').clearValidators();
    this.currentForm.get('hatFrequencyRecreational').clearValidators();
    this.currentForm.get('clothingFrequencyRecreational').clearValidators();
    this.currentForm.get('shadeFrequencyRecreational').clearValidators();

    this.currentForm.get('weeksPerYearRecreational').updateValueAndValidity();
    this.currentForm.get('yearsBackRecreational').updateValueAndValidity();
    this.currentForm.get('sunscreenFrequencyRecreational').updateValueAndValidity();
    this.currentForm.get('hatFrequencyRecreational').updateValueAndValidity();
    this.currentForm.get('clothingFrequencyRecreational').updateValueAndValidity();
    this.currentForm.get('shadeFrequencyRecreational').updateValueAndValidity();
  }

  // Isti princip za namernu izloženost
  setIntentionalValidators() {
    this.currentForm.get('weeksPerYearIntentional').setValidators([Validators.required, Validators.min(1)]);
    this.currentForm.get('yearsBackIntentional').setValidators([Validators.required, Validators.min(1)]);
    this.currentForm.get('sunscreenFrequencyIntentional').setValidators(Validators.required);
    this.currentForm.get('hatFrequencyIntentional').setValidators(Validators.required);
    this.currentForm.get('clothingFrequencyIntentional').setValidators(Validators.required);
    this.currentForm.get('shadeFrequencyIntentional').setValidators(Validators.required);

    this.currentForm.get('weeksPerYearIntentional').updateValueAndValidity();
    this.currentForm.get('yearsBackIntentional').updateValueAndValidity();
    this.currentForm.get('sunscreenFrequencyIntentional').updateValueAndValidity();
    this.currentForm.get('hatFrequencyIntentional').updateValueAndValidity();
    this.currentForm.get('clothingFrequencyIntentional').updateValueAndValidity();
    this.currentForm.get('shadeFrequencyIntentional').updateValueAndValidity();
  }

  clearIntentionalValidators() {
    this.currentForm.get('weeksPerYearIntentional').clearValidators();
    this.currentForm.get('yearsBackIntentional').clearValidators();
    this.currentForm.get('sunscreenFrequencyIntentional').clearValidators();
    this.currentForm.get('hatFrequencyIntentional').clearValidators();
    this.currentForm.get('clothingFrequencyIntentional').clearValidators();
    this.currentForm.get('shadeFrequencyIntentional').clearValidators();

    this.currentForm.get('weeksPerYearIntentional').updateValueAndValidity();
    this.currentForm.get('yearsBackIntentional').updateValueAndValidity();
    this.currentForm.get('sunscreenFrequencyIntentional').updateValueAndValidity();
    this.currentForm.get('hatFrequencyIntentional').updateValueAndValidity();
    this.currentForm.get('clothingFrequencyIntentional').updateValueAndValidity();
    this.currentForm.get('shadeFrequencyIntentional').updateValueAndValidity();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentForm)
    {
      
    sessionStorage.setItem(this.currentForm.value.name, JSON.stringify(this.currentForm.value));
    }
//alert(this.currentForm)
if (this.currentForm) {
// emit samo ako nes ima da se emit.
//currentForm je ono sto je prethodno popunjavano. 
// za poslednji deo idemo u ngOnDestroy
  this.newItemEvent.emit(this.currentForm)

}
this.switchPages()
   }




switchPages() {

  switch (this.currPage) {
    case 5: this.currentForm= this.questionnaireForm012; break;
    case 6:this.currentForm= this.questionnaireForm1319;  break;
    case 7: this.currentForm=this.questionnaireForm2040;  break;
    case 8:this.currentForm= this.questionnaireForm4060;  break;
    case 9: this.currentForm= this.questionnaireForm6080;  break;
    case 10:this.currentForm= this.questionnaireForm80plus; 
    }

    this.currentForm.get('occupationalExposureChildhood').valueChanges.subscribe((value:any) => {
      if (value === 'yes') {
        this.setOccupationalValidators();
      } else {
        this.clearOccupationalValidators();
      }
    });

    // Praćenje promene za recreationalExposureChildhood
    this.currentForm.get('recreationalExposureChildhood').valueChanges.subscribe((value:any)  => {
      if (value === 'yes') {
        this.setRecreationalValidators();
      } else {
        this.clearRecreationalValidators();
      }
    });

    // Praćenje promene za intentionalExposureChildhood
    this.currentForm.get('intentionalExposureChildhood').valueChanges.subscribe((value:any)  => {
      if (value === 'yes') {
        this.setIntentionalValidators();
      } else {
        this.clearIntentionalValidators();
      }
    });
  
}



  getHeadline(){
    switch (this.currPage) {
      case 5: return "TOKOM DETINJSTVA (0 to 12 god)"; 
      case 6: return "TOKOM PERIODA ADOLESCENCIJE (13 to 19 god)"; 
      case 7: return "IZMEĐU 20 I 40 GODINA STAROSTI"; 
      case 8: return "IZMEĐU 40 I 60 GODINA STAROSTI"; 
      case 9: return "IZMEĐU 60 AND 80 GODINA STAROSTI"; 
      case 10: return "PREKO 80 GODINA STAROSTI"; 
      default: return ""
    }
  }
  onSubmit(){}
  ngOnDestroy(){
    
    this.currentForm.markAllAsTouched();
    if (this.currentForm)
      {
        
      sessionStorage.setItem(this.currentForm.value.name, JSON.stringify(this.currentForm.value));
      }
    this.newItemEvent.emit(this.currentForm)
    // if (this.currentForm) {
    //   if (!this.currentForm.valid) {       
    //     this.toster.warning("Niste popunili sva polja sa prethodne stranice!")
    //   }
    // }
  }

  testClick(){

      this.currentForm.markAllAsTouched();
   if (!this.currentForm.valid) {
    this.toster.error("Niste popunili sva polja.")
   }
  }
}
