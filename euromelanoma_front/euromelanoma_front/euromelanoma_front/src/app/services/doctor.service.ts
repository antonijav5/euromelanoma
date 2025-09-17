import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  private url = `${environment.apiBaseUrl}/Doctor`;

  AddDoctorNotes(model: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'AddDoctorNotes', model);
  }

  GetPatientsForDoctor(doctorId: number) {
    return this.http.get(this.url + 'GetPatientsForDoctor/' + doctorId);
  }

  GetQuestionnairesForPatients(patientId: number) {
    return this.http.get(this.url + 'GetQuestionnairesForPatient/' + patientId);
  }

  GetQuestionnairesById(quesId: number) {
    return this.http.get(this.url + 'GetQuestionnairesById/' + quesId);
  }
  GetDoctorNotesByQuestionnaireId(quesId: number) {
    return this.http.get(
      this.url + 'GetDoctorNotesByQuestionnaireId/' + quesId
    );
  }
}
