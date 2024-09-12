import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/services/patient.service';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
@Component({
  selector: 'app-propose-slot',
  templateUrl: './propose-slot.component.html',
  styleUrl: './propose-slot.component.css'
})
export class ProposeSlotComponent implements OnInit{
  cities :any[]= []; 
  appointmentForm: any;
  appointmentScheduled:boolean=false
  date:Date=new Date()
  appointment:any
 html2pdf: any;
  constructor(
    public dialogRef: MatDialogRef<ProposeSlotComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private patientService:PatientService,
    private toster:ToastrService
  ) {
    this.appointmentForm = this.fb.group({
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ngOnInit() {
   
    this.patientService.getAvaliableCities().subscribe((res:any)=>{
      if (res.success) {
        this.cities=res.result
      }
    })
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.appointmentForm.valid) {
      this.appointmentScheduled=true
      let model={
        patientId:this.data.patientId,
        cityId:this.appointmentForm.get("city").value,
        phoneNumber:this.appointmentForm.get("phone").value,
      }

      this.patientService.scheduleAppointment(model).subscribe((res:any)=>{
        if (res.success) {
          this.toster.success("Čestitamo, termin je uspešno zakazan. Detalji o pregledu nalaze se na početnoj stranici.")
        this.patientService.getAppointments(this.data.patientId).subscribe((res:any)=> {
          //OVDE DOHVATIS TRRENUTNO ZAKAZANI TERMIN
        })
        
        }
      })
     // this.dialogRef.close(this.appointmentForm.value);
  
    } else {
      this.toster.error('Molimo vas popunite sve podatke.');
    }
  }

 downloadConfirmation(): void {
  //   var data = document.getElementById('pregled');  //Id of the table
  //   html2canvas(data).then(canvas => {  
  //     // Few necessary setting options  
  //     let imgWidth = 208;   
  //     let pageHeight = 295;    
  //     let imgHeight = canvas.height * imgWidth / canvas.width;  
  //     let heightLeft = imgHeight;  

  //     const contentDataURL = canvas.toDataURL('image/png')  
  //     let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
  //     let position = 0;  
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
  //     pdf.save('ZakazanPregled.pdf'); // Generated PDF   
  //   });
 }
  
}
