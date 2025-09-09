import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  token: string = '';

  passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !@#$%^&*()\-_=+\\|[\]{};:/?.>])[A-Za-z\d!@#$%^&*()\-_=+\\|[\]{};:/?.>]{8,}$/;
  newPassword = new FormControl('', [Validators.pattern(this.passwordPattern)]);

  confirmPassword = new FormControl('', [
    Validators.pattern(this.passwordPattern),
  ]);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toster: ToastrService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.newPassword.valid) {
      this.toster.error(
        'Lozinka mora imati bar 8 karaktera, bar 1 malo slovo, bar 1 veliko slovo i bar jedan specijalni karakter.'
      );
      return;
    }

    if (this.newPassword.value !== this.confirmPassword.value) {
      this.toster.error('Lozinke se ne podudaraju.');
      return;
    }

    const token = this.route.snapshot.params['token'];
    this.authService
      .resetPassword(
        token,
        this.newPassword.value ? this.newPassword.value : ''
      )
      .subscribe(
        (res: any) => {
          this.toster.success('Lozinka uspešno resetovana.');
          this.router.navigate(['/home']);
        },
        (err) => {
          this.toster.error('Došlo je do greške. Pokušajte ponovo.');
        }
      );
  }
}
