// propose-slot.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-propose-slot',
  templateUrl: './propose-slot.component.html',
  styleUrls: ['./propose-slot.component.css'],
})
export class ProposeSlotComponent implements OnInit {
  appointmentForm: FormGroup;
  cities: any[] = [];
  appointment: any = null;
  appointmentScheduled: boolean = false;
  isGeneratingPdf: boolean = false;
  today = new Date();
  selectedCityName: string = '';
  appointments: any[] = [];
  user: any = {};

  statusMapping: { [key: string]: string } = {
    Scheduled: 'Zakazan',
    Finished: 'Završen',
    Cancelled: 'Otkazan',
  };

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<ProposeSlotComponent>,
    private appointmentService: PatientService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointmentForm = this.fb.group({
      city: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let user_help = sessionStorage.getItem('auth-user');

    if (user_help) {
      this.user = JSON.parse(user_help);
    }

    this.loadCities();
  }

  loadCities(): void {
    this.patientService.getAvaliableCities().subscribe((response: any) => {
      if (response.success) {
        this.cities = response.result;
      }
    });
  }

  onConfirm(): void {
    if (this.appointmentForm.valid) {
      const formData = {
        patientId: this.data.patientId,
        phoneNumber: this.appointmentForm.get('phone')?.value,
        cityId: this.appointmentForm.get('city')?.value,
      };

      const selectedCity = this.cities.find(
        (c) => c.cityID === formData.cityId
      );
      this.selectedCityName = selectedCity?.name || '';

      this.patientService.scheduleAppointment(formData).subscribe({
        next: (response: any) => {
          if (response.success) {
            console.log(response);

            this.appointment = response.result;
            this.appointmentService
              .getAppointment(this.appointment.id)
              .subscribe((data: any) => {
                console.log(data);
                console.log(this.user);

                if (data.resultList && data.resultList.length > 0) {
                  let res = data.resultList[0];
                  this.appointment.startTime = res.startTime;
                  this.appointment.endTime = res.endTime;
                  this.appointment.status = res.status;
                  this.appointment.slotID = res.slotID;
                }
                this.appointmentScheduled = true;

                this.loadDoctorData();
              });
          }
        },
        error: (error) => {
          console.error('Greška pri zakazivanju:', error);
        },
      });
    }
  }

  loadDoctorData(): void {
    if (this.appointment && this.appointment.slotID) {
      console.log(this.appointment.slotID);

      this.patientService.getDoctor(this.appointment.slotID).subscribe({
        next: (res: any) => {
          let doctorResponse = res.resultList[0];
          if (doctorResponse) {
            this.appointment.doctorFirstName =
              doctorResponse.firstName || 'Dr.';
            this.appointment.doctorLastName =
              doctorResponse.lastName || 'Doktor';
            this.appointment.doctorId = doctorResponse.userID;
          }
        },
        error: (error) => {
          console.error('Greška pri učitavanju doktora:', error);
          this.appointment.doctorFirstName = 'Dr.';
          this.appointment.doctorLastName = 'Doktor';
        },
      });
    }
  }

  goHome() {
    this.router.navigate(['home']);
  }

  downloadConfirmation(): void {
    this.isGeneratingPdf = true;

    setTimeout(() => {
      const element = document.getElementById('pregled');
      if (!element) {
        this.isGeneratingPdf = false;
        return;
      }

      html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png', 1.0);
          const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

          const pdfWidth = pdf.internal.pageSize.getWidth();
          const imgWidth = pdfWidth - 20;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Dodaj header
          pdf.setFontSize(20);
          pdf.setTextColor(2, 49, 98);

          pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);

          const fileName = `Potvrda_Pregleda_${this.appointment.id}_${new Date()
            .toISOString()
            .slice(0, 10)}.pdf`;
          pdf.save(fileName);

          this.isGeneratingPdf = false;
        })
        .catch((error) => {
          console.error('Greška pri generisanju PDF-a:', error);
          this.isGeneratingPdf = false;
        });
    }, 100);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
