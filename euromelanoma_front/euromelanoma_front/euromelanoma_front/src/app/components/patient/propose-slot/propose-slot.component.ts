// propose-slot.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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

  statusMapping: { [key: string]: string } = {
    Scheduled: 'Zakazan',
    Finished: 'Završen',
    Cancelled: 'Otkazan',
  };

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<ProposeSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.appointmentForm = this.fb.group({
      city: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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

      // Zapamti naziv grada za PDF
      const selectedCity = this.cities.find(
        (c) => c.cityID === formData.cityId
      );
      this.selectedCityName = selectedCity?.name || '';

      this.patientService.scheduleAppointment(formData).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.appointment = response.result;
            this.appointmentScheduled = true;

            this.loadDoctorData();
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
      this.patientService.getDoctor(this.appointment.slotID).subscribe({
        next: (doctorResponse: any) => {
          if (doctorResponse.success && doctorResponse.result) {
            this.appointment.doctorFirstName =
              doctorResponse.result.firstName || 'Dr.';
            this.appointment.doctorLastName =
              doctorResponse.result.lastName || 'Doktor';
            this.appointment.doctorId = doctorResponse.result.userID;
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
          pdf.text('POTVRDA O ZAKAZANOM PREGLEDU', pdfWidth / 2, 15, {
            align: 'center',
          });

          pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);

          const fileName = `Potvrda_Pregleda_${
            this.appointment.scheduledAppointmentID
          }_${new Date().toISOString().slice(0, 10)}.pdf`;
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
