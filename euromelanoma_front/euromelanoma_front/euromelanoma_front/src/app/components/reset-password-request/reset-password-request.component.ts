import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.css',
})
export class ResetPasswordRequestComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private toster: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.isValidEmail(this.email)) {
      this.toster.error('Unesite validnu email adresu.');
      return;
    }

    this.authService.forgotPassword(this.email).subscribe((res: any) => {
      if (res.success) {
        this.toster.success(
          'Link za reset lozinke je poslat na vašu email adresu.'
        );
        this.router.navigate(['home']);
      } else {
        this.toster.error(
          res.result ?? 'Došlo je do greške. Pokušajte ponovo.'
        );
      }
    });
  }

  isValidEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}
