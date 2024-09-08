import { Component, Input } from '@angular/core';
import { QuestionnaireComponent } from '../../patient/questionnaire/questionnaire.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-patients-view-admin',
  templateUrl: './patients-view-admin.component.html',
  styleUrl: './patients-view-admin.component.css'
})
export class PatientsViewAdminComponent {
  patients: any[] = [];
  displayedColumns: string[] = ['firstname','lastname', 'mail', 'action'];

  constructor(private http: HttpClient, public dialog: MatDialog, private adminService:AdminService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.adminService.GetPatients().subscribe((res:any) => {
      this.patients = res.result;
    });
  }

  openQuestionnairesDialog(patient: any): void {
    const dialogRef = this.dialog.open(QuestionnaireComponent, {
      width: "910px",
      data: { patientId: patient.id}
    });
  }

  exportToExcel(): void {
this.adminService.ExportExcel().subscribe((data: Blob) => {

      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `Questionnaires_${new Date().toISOString().split('T')[0]}.xlsx`; // Koristite ISO format datuma za ime fajla
      link.click();

      window.URL.revokeObjectURL(url);
    });

}
}