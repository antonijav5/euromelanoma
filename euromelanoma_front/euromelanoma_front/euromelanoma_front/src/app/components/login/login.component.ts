import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword: boolean=false;
  hide = true;
  responeData: any;
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  user: any;

  sideBarOpen = true;
  constructor(
    private router: Router,
    private auth: AuthService,
    private toster: ToastrService,
    private spinner: NgxSpinnerService,
    //private data: DataService
  ) { }
  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home']);
      //this.data.sideBarOpen = true;
    }
    setTimeout(() => {
      this.spinner.hide()
    }, 500);

  }

  onSubmit(): void {
    if (this.username.valid && this.password.valid) {
      this.auth.login(this.username.value?this.username.value:'', this.password.value?this.password.value:'').subscribe(
        (res: any) => {
          if (res.success) {
            this.user = res.resultList[0];
            this.auth.saveToken(this.user.token)
            this.auth.saveUser(this.user)
            this.router.navigate(['home']);
            this.spinner.show();
            
          } else {
            sessionStorage.clear();
            this.password.setValue('');
            this.toster.error(res.message, 'Globos Osiguranje')
          }
        },
        (err: any) => {
          this.toster.error("User " + err.statusText, 'Globos Osiguranje')
          sessionStorage.clear();
        }
      );
    } else {
      this.toster.error('Morate popuniti sva polja', 'Globos Osiguranje')
      sessionStorage.clear();
    }
  }


  toggleShow() {
    this.hide = !this.hide;
  }
}