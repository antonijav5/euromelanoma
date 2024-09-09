import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password-request',
  templateUrl: './reset-password-request.component.html',
  styleUrl: './reset-password-request.component.css'
})
export class ResetPasswordRequestComponent {
  email: string="";

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private toster:ToastrService)
    {

  }

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe(() => {
      this.toster.success('Link za reset lozinke je poslat na vašu email adresu.');
    }, err => {
      this.toster.error('Došlo je do greške. Pokušajte ponovo.');
    });
  }
}
