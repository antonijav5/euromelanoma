import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  private url = `${environment.apiBaseUrl}/Patient/`;

  insertPatientData(model: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'InsertQuestionnaire', model);
  }

  getAppointments(id: number) {
    return this.http.get(this.url + 'GetAppointments/' + id);
  }

  getAppointment(id: number) {
    return this.http.get(this.url + 'GetAppointment/' + id);
  }

  scheduleAppointment(model: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'ScheduleAppointment', model);
  }

  getAvaliableCities() {
    return this.http.get(this.url + 'GetAvaliableCities');
  }

  getDoctor(slotId: number) {
    return this.http.get(this.url + 'GetDoctor/' + slotId);
  }
}
