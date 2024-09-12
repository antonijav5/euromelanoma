import { Component } from '@angular/core';
import * as moment from 'moment';
import { AdminService } from 'src/app/services/admin.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-scheduled-appointment-patient',
  templateUrl: './scheduled-appointment-patient.component.html',
  styleUrl: './scheduled-appointment-patient.component.css'
})
export class ScheduledAppointmentPatientComponent {
  appointments: any[] = [];
  user:any  
cities:any[]=[]
  constructor(private appointmentService: PatientService, private adminService:AdminService) { }

  ngOnInit(): void {
    let user_help=sessionStorage.getItem("auth-user")

      if (user_help) 
        {
          this.user=JSON.parse(user_help);
        }
this.adminService.GetCities().subscribe((res:any)=>{
  if (res.success) {
this.cities=res.result
    this.appointmentService.getAppointments(this.user.id).subscribe((data: any) => {
     let curr:any[]= data.resultList;
curr.forEach(element => {
  this.appointments.push({
    cityName: this.cities.find(a=>a.cityID==element.cityID).name,
endTime:element.endTime,
patient: element.patient,
patientID: element.patientID,
phoneNumber: element.phoneNumber,
scheduledAppointmentID: element.scheduledAppointmentID,
slot: element.slot,
slotID: element.slotID,
startTime:element.startTime,
status: element.status
  })
});
this.appointments.sort((a: any, b: any) => {
  return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
});

    });
  }
})
   
  }
}
