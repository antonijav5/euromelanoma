// scheduled-appointment-patient.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import * as moment from 'moment';
import { AdminService } from 'src/app/services/admin.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-scheduled-appointment-patient',
  templateUrl: './scheduled-appointment-patient.component.html',
  styleUrl: './scheduled-appointment-patient.component.css',
})
export class ScheduledAppointmentPatientComponent {
  appointments: any[] = [];
  user: any;
  cities: any[] = [];
  selectedAppointment: any = null;
  isGeneratingPdf: boolean = false;
  today = new Date();

  constructor(
    private appointmentService: PatientService,
    private adminService: AdminService,
    private router: Router
  ) {}

  statusMapping: { [key: string]: string } = {
    Scheduled: 'Zakazan',
    Finished: 'Završen',
  };

  ngOnInit(): void {
    let user_help = sessionStorage.getItem('auth-user');

    if (user_help) {
      this.user = JSON.parse(user_help);
    }

    this.loadData();
  }

  loadData(): void {
    this.adminService.GetCities().subscribe((res: any) => {
      if (res.success) {
        this.cities = res.result;
        this.appointmentService
          .getAppointments(this.user.id)
          .subscribe((data: any) => {
            if (data.resultList && data.resultList.length > 0) {
              this.processAppointments(data.resultList);
            }
          });
      }
    });
  }

  processAppointments(appointmentsData: any[]): void {
    this.appointments = [];
    let processedCount = 0;
    const totalCount = appointmentsData.length;

    appointmentsData.forEach((appointment) => {
      const city = this.cities.find((c) => c.cityID === appointment.cityID);

      this.appointmentService.getDoctor(appointment.slotID).subscribe({
        next: (doctorResponse: any) => {
          const processedAppointment = {
            ...appointment,
            cityName: city?.name || 'Nepoznato',
            doctorFirstName: doctorResponse.resultList[0]?.firstName || 'Dr.',
            doctorLastName: doctorResponse.resultList[0]?.lastName || 'Doktor',
            doctorId: doctorResponse.resultList[0]?.userID || null,
          };

          this.appointments.push(processedAppointment);
          processedCount++;

          if (processedCount === totalCount) {
            this.sortAppointments();
          }
        },
        error: (error) => {
          console.error(
            'Greška pri učitavanju doktora za slot:',
            appointment.slotID,
            error
          );

          const processedAppointment = {
            ...appointment,
            cityName: city?.name || 'Nepoznato',
            doctorFirstName: 'Dr.',
            doctorLastName: 'Doktor',
            doctorId: null,
          };

          this.appointments.push(processedAppointment);
          processedCount++;

          if (processedCount === totalCount) {
            this.sortAppointments();
          }
        },
      });
    });
  }

  sortAppointments(): void {
    this.appointments.sort((a: any, b: any) => {
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'scheduled';
      case 'finished':
        return 'completed';
      case 'cancelled':
        return 'cancelled';
      default:
        return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return 'schedule';
      case 'finished':
        return 'check_circle';
      case 'cancelled':
        return 'cancel';
      default:
        return 'info';
    }
  }

  allAppointmentsFinished(): boolean {
    if (!this.appointments || this.appointments.length === 0) {
      return false;
    }

    return this.appointments.every(
      (appointment) => appointment.status === 'Finished'
    );
  }

  questionnaireShown = false;

  navigateToQuestionnaire(): void {
    this.questionnaireShown = true;
    this.router.navigate(['/home'], {
      queryParams: { show: 'questionnaire' },
    });
  }

  downloadConfirmation(appointment: any): void {
    this.isGeneratingPdf = true;
    this.selectedAppointment = appointment;

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

          pdf.setFontSize(20);
          pdf.setTextColor(2, 49, 98);

          pdf.addImage(imgData, 'PNG', 10, 25, imgWidth, imgHeight);

          const fileName = `Potvrda_Pregleda_${
            appointment.scheduledAppointmentID
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
}
