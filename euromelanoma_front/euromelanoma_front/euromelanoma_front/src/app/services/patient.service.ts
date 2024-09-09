import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
    
@Injectable({
    providedIn: 'root'
  })
export class PatientService {
environment:any={

    
    apiBaseUrl:"http://localhost:21493"
  }
  constructor(private http: HttpClient) { }

  url: string = this.environment.apiBaseUrl + '/api/Patient/';

  insertPatientData(model:any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.url + "InsertQuestionnaire", model);
  }

  getAppointments(id:number) {
    return this.http.get(this.url+"GetAppointments/"+id)
  }
}

