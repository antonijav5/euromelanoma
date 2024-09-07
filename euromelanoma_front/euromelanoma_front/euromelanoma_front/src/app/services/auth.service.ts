import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string="";
  private inactivityDuration: number = 3600 * 1000; // 60min * 60s * 1000ms = 1h neaktivnosti
  private activityTimer: any;
  private isReloading:boolean=false
  private loggedIn: boolean = false;
  environment:any={
    apiBaseUrl:"http://localhost:21493"
  } 
  url: string = this.environment.apiBaseUrl + '/api/User/';

  constructor(
    private router: Router,
    private http: HttpClient,
    private spinner: NgxSpinnerService

  ) {
    ['mousemove', 'mousedown', 'keypress', 'touchstart'].forEach((event) => {
      window.addEventListener(event, this.resetActivityTimer.bind(this));
    });

    // window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }



  ngOnDestroy(): void {
    ['mousemove', 'mousedown', 'keypress', 'touchstart'].forEach((event) => {
      window.removeEventListener(event, this.resetActivityTimer.bind(this));
    });

    // window.removeEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }


  // private handleBeforeUnload(event: BeforeUnloadEvent): void {
  //   if (this.loggedIn) {
  //     this.signOut();
  //   }
  // }

  private setReloadingFlag(event: Event) {
    // Postavlja zastavicu da je reload u toku
    this.isReloading = true;
  }

  private resetActivityTimer(): void {
    clearTimeout(this.activityTimer);

    this.activityTimer = setTimeout(() => {
      if (this.loggedIn) {
        this.signOut();
        alert('Istekla Vam je sesija...');
        sessionStorage.clear();
      }
    }, this.inactivityDuration);
  }

  setLoggedInStatus(loggedIn: boolean): void {
    this.loggedIn = loggedIn;

    if (!loggedIn) {
      clearTimeout(this.activityTimer);
    }
  }

  public saveToken(token: string): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public (): boolean {
    // if (this.getToken()) {
    //   return true;
    // } else {
    //   sessionStorage.clear();
    //   return false;
    // }
    return true
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  login(username:string, password:string): Observable<any> {
    if (username && password) {
      const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
      this.saveToken(this.token);
    
      return this.http.post<any>(this.url + 'Login?' + 'username=' + username + '&password=' + password, { headers: reqHeader })
        .pipe(
          tap(() => {
            this.loggedIn = true;
          })
        );
    }
    return throwError(new Error('Failed to login'));
  }

  reset(modelReset:any): Observable<any> {
    if (modelReset) {
      const reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
      this.saveToken(this.token);
      return this.http.post<any>(this.url + 'ResetPassword?' + 'username=' + modelReset.username + '&oldPassword=' + modelReset.oldPassword + '&newPassword=' + modelReset.newPassword, { headers: reqHeader })
    }
    return throwError(new Error('Failed to reset'));
  }

  signOut(): void {
  
    this.loggedIn = false;
     sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
