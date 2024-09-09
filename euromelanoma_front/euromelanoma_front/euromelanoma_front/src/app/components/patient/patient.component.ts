import { Component, Input } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
show:string="questionnaire"
appointments: any[] = [];
user:any  

constructor(private appointmentService: PatientService) { }

ngOnInit(): void {
  let user_help=sessionStorage.getItem("auth-user")

    if (user_help) 
      {
        this.user=JSON.parse(user_help);
      }

  this.appointmentService.getAppointments(this.user.id).subscribe((data: any) => {
    this.appointments = data.resultList;
  });
}
}
