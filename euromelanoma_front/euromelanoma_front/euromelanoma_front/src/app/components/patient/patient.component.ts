import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/services/patient.service';
import { ExaminationResultsComponent } from './examination-results/examination-results.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent {
  show: string = 'questionnaire';
  appointments: any[] = [];
  user: any = {};

  constructor(
    private appointmentService: PatientService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    let user_help = sessionStorage.getItem('auth-user');

    if (user_help) {
      this.user = JSON.parse(user_help);
    }
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService
      .getAppointments(this.user.id)
      .subscribe((data: any) => {
        this.appointments = data.resultList;
        this.route.queryParams.subscribe((params) => {
          if (this.appointments.length > 0) {
            if (params['show'] == 'questionnaire') {
              this.show = 'both';
            } else {
              this.show = 'appointments';
            }
          }
        });
      });
  }
}
