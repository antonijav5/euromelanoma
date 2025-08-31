import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionnaireComponent } from '../patient/questionnaire/questionnaire.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css'],
})
export class DoctorComponent {
  filteredPatients: any[] = [];
  patients: any[] = [];
  patientId: string = '';
  displayedColumns: string[] = ['id', 'ime', 'prezime', 'upitnici']; // Dodajte ostale kolone

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private doctorService: DoctorService
  ) {}

  user: any = {};

  ngOnInit(): void {
    let user_help = sessionStorage.getItem('auth-user');

    if (user_help) {
      this.user = JSON.parse(user_help);
    } else {
      this.user = {};
    }

    this.getPatientsForDoctor(this.user.id);
  }

  getPatientsForDoctor(id: number): void {
    this.doctorService.GetPatientsForDoctor(id).subscribe((res: any) => {
      let lista: any[] = res.resultList;
      let requests: any[] = [];

      lista.forEach((element) => {
        let request = this.doctorService
          .GetQuestionnairesForPatients(element.userID)
          .pipe(
            map((res2: any) => {
              return { patient: element, questionnaires: res2.resultList };
            })
          );

        requests.push(request);
      });

      forkJoin(requests).subscribe((results) => {
        this.patients = results;
        this.filteredPatients = results;
      });
    });
  }

  searchPatient(): void {
    const searchTerm = this.patientId.toLowerCase(); // Pretvaramo unetu vrednost u mala slova
    if (searchTerm) {
      // Filtriraj pacijente prema ID-ju, imenu ili prezimenu
      this.filteredPatients = this.patients.filter((patientObject) => {
        const userID = patientObject.patient.userID.toString().toLowerCase();
        const firstName = patientObject.patient.firstName.toLowerCase();
        const lastName = patientObject.patient.lastName.toLowerCase();

        return (
          userID.includes(searchTerm) ||
          firstName.includes(searchTerm) ||
          lastName.includes(searchTerm)
        );
      });
    } else {
      // Ako polje za unos pretrage nije popunjeno, prikaži sve pacijente
      this.filteredPatients = this.patients;
    }
  }

  openQuestionnaire(patientid: number, qid: number) {
    const dialogRef = this.dialog.open(QuestionnaireComponent, {
      width: '910px',
      height: '775px',
      data: { patientId: patientid, whothere: 'doctor', questionnaireId: qid },
    });
  }
}
