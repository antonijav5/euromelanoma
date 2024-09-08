import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
    
@Injectable({
    providedIn: 'root'
  })
export class AdminService {

  environment:any={
    apiBaseUrl:"http://localhost:21493"
  }
  constructor(private http: HttpClient) { }

  url: string = this.environment.apiBaseUrl + '/api/Admin/';

     RegisterPatient(model:any): Observable<any> {
      const headers = new HttpHeaders().set('Content-Type', 'application/json')
      return this.http.post(this.url + "RegisterPatient", model);
    }
     RegisterDoctor(model:any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.post(this.url + "RegisterDoctor", model);
      }

     CreateDoctorRegisterRequest(model:any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.post(this.url + "CreateDoctorRegisterRequest", model);
      }


      AddAppointment(model:any): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
        return this.http.post(this.url + "AddAppointment", model);
      }

      GetDoctors() {
        return this.http.get(this.url + "GetDoctors");
      }

      GetCities(){
        return this.http.get(this.url + "GetCities");
      }

      GetPatients() {
        return this.http.get(this.url + "GetPatients");
      }
      ExportExcel(): Observable<Blob> {
        return this.http.post(this.url + 'ExportExcel', {}, { responseType: 'blob' });
      }
 }
