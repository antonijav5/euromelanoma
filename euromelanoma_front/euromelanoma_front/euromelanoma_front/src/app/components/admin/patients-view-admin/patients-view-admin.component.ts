import { Component, Input } from '@angular/core';
import { QuestionnaireComponent } from '../../patient/questionnaire/questionnaire.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-patients-view-admin',
  templateUrl: './patients-view-admin.component.html',
  styleUrl: './patients-view-admin.component.css',
})
export class PatientsViewAdminComponent {
  patients: any[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'mail', 'action'];
  isExporting: boolean = false;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loadPatientsWithQuestionnaires();
  }

  loadPatientsWithQuestionnaires(): void {
    // Prvo učitaj pacijente
    this.adminService.GetPatients().subscribe((patientsResponse: any) => {
      if (patientsResponse.success) {
        const patientsData = patientsResponse.result;
        let processedCount = 0;
        this.patients = patientsData;

        patientsData.forEach((patient: any) => {
          this.adminService
            .GetQuestionnairesByPatient(patient.userID)
            .subscribe((questionnairesResponse: any) => {
              const patientWithQuestionnaires = {
                ...patient,
                questionnaires: questionnairesResponse.success
                  ? questionnairesResponse.result
                  : [],
              };
              processedCount++;
              patient.questionnaires = patientWithQuestionnaires.questionnaires;
              processedCount++;

              if (processedCount === patientsData.length) {
                this.patients.sort((a, b) =>
                  a.firstName.localeCompare(b.firstName)
                );
              }
            });
        });
      }
    });
  }

  openQuestionnairesDialog(patient: any, questionnaireId: number): void {
    this.dialog.open(QuestionnaireComponent, {
      width: '910px',
      height: '775px',
      data: { patientId: patient.userID, questionnaireId: questionnaireId },
    });
  }

  getTotalQuestionnaires(): number {
    return this.patients.reduce((total, patient) => {
      return total + (patient.questionnaires?.length || 0);
    }, 0);
  }

  exportToExcel(): void {
    this.isExporting = true;
    this.adminService.ExportExcel().subscribe((data: Blob) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `Questionnaires_${
        new Date().toISOString().split('T')[0]
      }.xlsx`;
      link.click();
      this.isExporting = false;
      window.URL.revokeObjectURL(url);
    });
  }

  getStatusIcon(questionnaire: any): string {
    if (!questionnaire.completeDate) {
      return 'pending'; // Crveni - nije popunjen
    } else if (questionnaire.completeDate && !questionnaire.doctorID) {
      return 'schedule'; // Narandžasti - čeka pregled
    } else {
      return 'check_circle'; // Zeleni - pregled završen
    }
  }

  getStatusTooltip(questionnaire: any): string {
    if (!questionnaire.completeDate) {
      return 'Upitnik nije popunjen';
    } else if (questionnaire.completeDate && !questionnaire.doctorID) {
      return 'Upitnik popunjen, čeka pregled doktora';
    } else {
      return 'Pregled kod doktora završen';
    }
  }

  getStatusText(questionnaire: any): string {
    if (!questionnaire.completeDate) {
      return 'Nije popunjen';
    } else if (questionnaire.completeDate && !questionnaire.doctorID) {
      return 'Čeka pregled';
    } else {
      return 'Pregledao doktor';
    }
  }

  // Dodaj statistike za novu logiku
  getCompletedQuestionnaires(): number {
    return this.patients.reduce((total, patient) => {
      return (
        total +
        (patient.questionnaires?.filter(
          (q: any) => q.completeDate && q.doctorID
        ).length || 0)
      );
    }, 0);
  }

  getPendingReviews(): number {
    return this.patients.reduce((total, patient) => {
      return (
        total +
        (patient.questionnaires?.filter(
          (q: any) => q.completeDate && !q.doctorID
        ).length || 0)
      );
    }, 0);
  }

  getIncompleteQuestionnaires(): number {
    return this.patients.reduce((total, patient) => {
      return (
        total +
        (patient.questionnaires?.filter((q: any) => !q.completeDate).length ||
          0)
      );
    }, 0);
  }
}
