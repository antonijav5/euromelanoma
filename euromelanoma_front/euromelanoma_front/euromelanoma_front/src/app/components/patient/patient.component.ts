import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/services/patient.service';
import { ExaminationResultsComponent } from './examination-results/examination-results.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent {
show:string="questionnaire"
appointments: any[] = [];
user:any={}

constructor(private appointmentService: PatientService,         public dialog: MatDialog) {
  let user_help=sessionStorage.getItem("auth-user")

  if (user_help) 
    {
      this.user=JSON.parse(user_help);
      
    }
 }

ngOnInit(): void {
  // const dialogRef = this.dialog.open(ExaminationResultsComponent, {
  //   width: "610px",
  //   data: { patientId:4, score: 100, id:5}
  // });
this.getAppointments()


}

getAppointments() {

  this.appointmentService.getAppointments(this.user.id).subscribe((data: any) => {
    this.appointments = data.resultList;
    console.log(this.appointments);
    
  });
}
}
