import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-avaliable-slots-insert',
  templateUrl: './avaliable-slots-insert.component.html',
  styleUrl: './avaliable-slots-insert.component.css',
})
export class AvaliableSlotsInsertComponent {
  appointmentForm: FormGroup;
  doctors: any[] = [];
  cities: any = [];
  startDate: Date | undefined;
  minStartDate: Date = new Date();
  minEndDate: Date = new Date();
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toster: ToastrService
  ) {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      cityId: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      maxPatients: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.minStartDate = new Date();
    this.adminService
      .GetDoctors()
      .subscribe((data: any) => (this.doctors = data.result));
    this.adminService
      .GetCities()
      .subscribe((data: any) => (this.cities = data.result));
  }

  onStartDateChange(event: any): void {
    const selectedDate = new Date(event.value);

    if (this.isOnlyDateSelected(selectedDate)) {
      selectedDate.setHours(9, 0, 0, 0);
      this.appointmentForm.patchValue({
        startTime: selectedDate,
      });
    }
    this.minEndDate = selectedDate;
    this.setDefaultEndTime(selectedDate);
  }

  setDefaultEndTime(startDate: Date): void {
    const endDate = new Date(startDate);

    if (startDate.getHours() === 9 && startDate.getMinutes() === 0) {
      endDate.setHours(10, 0, 0, 0);
    } else {
      endDate.setTime(startDate.getTime() + 60 * 60 * 1000);
    }

    this.appointmentForm.patchValue({
      endTime: endDate,
    });

    this.minEndDate = endDate;
  }

  isOnlyDateSelected(date: Date): boolean {
    return (
      date.getHours() === 0 &&
      date.getMinutes() === 0 &&
      date.getSeconds() === 0
    );
  }

  formatDate(date: Date): string {
    const localDate = new Date(date);
    return (
      localDate.getFullYear() +
      '-' +
      this.pad(localDate.getMonth() + 1) +
      '-' +
      this.pad(localDate.getDate()) +
      'T' +
      this.pad(localDate.getHours()) +
      ':' +
      this.pad(localDate.getMinutes()) +
      ':' +
      this.pad(localDate.getSeconds())
    );
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  onSubmit(): void {
    this.isSubmitting = true;

    if (
      this.appointmentForm.get('endTime')?.value <
      this.appointmentForm.get('startTime')?.value
    ) {
      this.toster.error('Kraj termina ne može biti pre početka termina.');
      this.isSubmitting = false;
      return;
    }

    if (this.appointmentForm.valid) {
      let model = {
        doctorId: this.appointmentForm.get('doctorId')?.value,
        cityId: this.appointmentForm.get('cityId')?.value,
        startTime: this.formatDate(
          this.appointmentForm.get('startTime')?.value
        ),
        endTime: this.formatDate(this.appointmentForm.get('endTime')?.value),
        maxPatients: this.appointmentForm.get('maxPatients')?.value,
      };

      this.adminService.AddAppointment(model).subscribe((res: any) => {
        if (res.success) {
          this.toster.success('Termin uspešno dodat', 'Čestitke!');

          this.resetForm();
        } else {
          this.toster.error(
            'Došlo je do greške prilikom dodavanja termina',
            'Greška!'
          );
        }
        this.isSubmitting = false;
      });
    } else {
      this.isSubmitting = false;
    }
  }

  resetForm(): void {
    this.appointmentForm.reset();

    Object.keys(this.appointmentForm.controls).forEach((key) => {
      const control = this.appointmentForm.get(key);
      if (control) {
        control.setErrors(null);
        control.markAsUntouched();
        control.markAsPristine();
      }
    });
  }

  getCurrDate(): Date {
    return new Date();
  }
}
