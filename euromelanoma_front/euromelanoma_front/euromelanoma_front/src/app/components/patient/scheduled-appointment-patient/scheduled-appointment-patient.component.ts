import { Component } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-scheduled-appointment-patient',
  templateUrl: './scheduled-appointment-patient.component.html',
  styleUrl: './scheduled-appointment-patient.component.css'
})
export class ScheduledAppointmentPatientComponent {
  appointments: any[] = [];
  user:any  

  constructor(private appointmentService: PatientService) { }

  ngOnInit(): void {
    let user_help=sessionStorage.getItem("auth-user")

      if (user_help) 
        {
          this.user=JSON.parse(user_help);
        }

    this.appointmentService.getAppointments(this.user.userID).subscribe((data: any) => {
      this.appointments = data.resultList;
    });
  }

  viewDetails(appointment: any) {
    // Ovdje možeš otvoriti modal ili preusmeriti na stranicu sa detaljima
    console.log('Detalji pregleda:', appointment);
  }
}
