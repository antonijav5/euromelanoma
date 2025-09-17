import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private url = `${environment.apiBaseUrl}/Admin/`;

  RegisterPatient(model: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'RegisterPatient', model);
  }
  RegisterDoctor(model: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'RegisterDoctor', model);
  }

  CreateDoctorRegisterRequest(model: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'CreateDoctorRegisterRequest', model);
  }

  AddAppointment(model: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.url + 'AddAppointment', model);
  }

  GetDoctors() {
    return this.http.get(this.url + 'GetDoctors');
  }

  GetCities() {
    return this.http.get(this.url + 'GetCities');
  }

  GetPatients() {
    return this.http.get(this.url + 'GetPatients');
  }

  ExportExcel(): Observable<Blob> {
    return this.http.post(
      this.url + 'ExportExcel',
      {},
      { responseType: 'blob' }
    );
  }

  DeleteRequest(id: number) {
    return this.http.post(this.url + 'DeleteRequest?idReq=' + id, {});
  }

  GetQuestionnairesByPatient(patientId: number) {
    return this.http.get(this.url + 'GetQuestionnairesByPatient/' + patientId);
  }

  GetAllAppointments() {
    return this.http.get(this.url + 'GetAllAppointments');
  }

  GetAvailableSlotsForCity(cityId: number) {
    return this.http.get(this.url + 'GetAvailableSlotsForCity/' + cityId);
  }
}
