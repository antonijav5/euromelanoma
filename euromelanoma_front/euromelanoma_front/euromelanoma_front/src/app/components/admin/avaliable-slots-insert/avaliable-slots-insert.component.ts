import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-avaliable-slots-insert',
  templateUrl: './avaliable-slots-insert.component.html',
  styleUrl: './avaliable-slots-insert.component.css'
})
export class AvaliableSlotsInsertComponent {
  appointmentForm: FormGroup;
  doctors :any[]= [];
  cities :any= [];
  startDate: Date | undefined;
  minStartDate: Date=new Date();
  minEndDate: Date=new Date();



  onStartDateChange(event: any): void {
    // Kada se promeni početni datum, ažuriramo minimalni datum za krajnji termin
    console.log(event.value);
    
    const selectedDate = new Date(event.value);
  
  // Postavite minEndDate tako da uključuje datum i vreme
  this.minEndDate = selectedDate;
  }

  constructor(private fb: FormBuilder, private adminService: AdminService, private toster: ToastrService) {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      cityId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      maxPatients: ['', [Validators.required, Validators.min(1)]]
    });
  }




  ngOnInit(): void {
     // Postavljanje trenutnog datuma kao minimum za početak termina
     this.minStartDate = new Date();
    this.adminService.GetDoctors().subscribe((data:any) => (this.doctors = data.result));
    this.adminService.GetCities().subscribe((data:any) => (this.cities = data.result));
  }

  formatDate(date: Date): string {
    const localDate = new Date(date);
    return localDate.getFullYear() + '-' +
           this.pad(localDate.getMonth() + 1) + '-' + 
           this.pad(localDate.getDate()) + 'T' +
           this.pad(localDate.getHours()) + ':' + 
           this.pad(localDate.getMinutes()) + ':' +
           this.pad(localDate.getSeconds());
  }
  
  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  onSubmit(): void {
    if (this.appointmentForm.get('endTime')?.value<this.appointmentForm.get('startTime')?.value)
    {
      this.toster.error("Kraj termina ne može biti pre početka termina.")
    return
    }
    if (this.appointmentForm.valid) {
      let model={
        doctorId:this.appointmentForm.get('doctorId')?.value,
        cityId:this.appointmentForm.get('cityId')?.value,
        startTime: this.formatDate(this.appointmentForm.get('startTime')?.value), // Formatiramo datume
        endTime: this.formatDate(this.appointmentForm.get('endTime')?.value),
        maxPatients:this.appointmentForm.get('maxPatients')?.value,
      }
      this.adminService.AddAppointment(model).subscribe(
        (res:any) => {
         if (res.success) {
          this.toster.success('Termin uspešno dodat', 'Čestitke!');
          this.appointmentForm.reset();
        
         }
         else 
          this.toster.error('Došlo je do greške prilikom dodavanja termina', 'Greška!');
        }
      );
    }
  }


  getCurrDate(): Date {
    return new Date(); // Vraća trenutni datum i vreme
  }
}
