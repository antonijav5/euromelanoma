// login.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  isLoading = false;
  user: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  get username() {
    return this.loginForm.get('username')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  ngOnInit(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['home']);
      return;
    }

    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    this.loadRememberedCredentials();
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      this.toastr.error(
        'Molimo popunite sva obavezna polja ispravno.',
        'Greška!'
      );
      return;
    }

    this.isLoading = true;
    const { username, password, rememberMe } = this.loginForm.value;

    this.auth.login(username, password).subscribe({
      next: (res: any) => {
        this.handleLoginSuccess(res, rememberMe);
      },
      error: (err: any) => {
        this.handleLoginError(err);
      },
    });
  }

  private handleLoginSuccess(res: any, rememberMe: boolean): void {
    if (res.success) {
      this.user = res.resultList[0];

      this.auth.saveToken(this.user.token);
      this.auth.saveUser(this.user);

      if (rememberMe) {
        this.saveCredentials();
      } else {
        this.clearSavedCredentials();
      }

      this.toastr.success(
        `Dobro došli, ${this.user.nazivUsera || this.user.firstName}!`,
        'Uspešna prijava!'
      );
      this.spinner.show();

      setTimeout(() => {
        this.router.navigate(['home']);
      }, 500);
    } else {
      this.handleLoginError(res);
    }
  }

  private handleLoginError(error: any): void {
    this.isLoading = false;
    sessionStorage.clear();

    const errorMessage =
      error.message ||
      error.statusText ||
      'Došlo je do greške prilikom prijavljivanja';
    this.toastr.error(errorMessage, 'Greška!');

    // Resetuj lozinku
    this.password.setValue('');
    this.password.markAsUntouched();
  }

  toggleShow(): void {
    this.hide = !this.hide;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  private saveCredentials(): void {
    if (this.username.value && this.password.value) {
      localStorage.setItem('rememberedUsername', this.username.value);
    }
  }

  private loadRememberedCredentials(): void {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      this.loginForm.patchValue({
        username: rememberedUsername,
        rememberMe: true,
      });
    }
  }

  private clearSavedCredentials(): void {
    localStorage.removeItem('rememberedUsername');
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
