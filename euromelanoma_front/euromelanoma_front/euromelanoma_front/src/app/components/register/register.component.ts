import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !@#$%^&*()\-_=+\\|[\]{};:/?.>])[A-Za-z\d!@#$%^&*()\-_=+\\|[\]{};:/?.>]{8,}$/;
  password = new FormControl('', [Validators.pattern(this.passwordPattern)]);
  confirmPassword = new FormControl('');
  email = new FormControl('');
  lastName = new FormControl('');
  firstName = new FormControl('');
  userType = new FormControl('patient');
  username = new FormControl('');
  users: any[] = [];

  constructor(
    private toster: ToastrService,
    private adminService: AdminService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUsers().subscribe((res: any) => {
      if (res.success) {
        this.users = res.resultList;
      }
    });
  }

  onSubmit() {
    if (this.username.value == '') {
      this.toster.error('Unesite korisničko ime.', 'Greška!');
      return;
    }
    if (this.firstName.value == '') {
      this.toster.error('Unesite ime.', 'Greška!');
      return;
    }
    if (this.lastName.value == '') {
      this.toster.error('Unesite prezime.', 'Greška!');
      return;
    }
    if (this.email.value == '') {
      this.toster.error('Unesite email adresu.', 'Greška!');
      return;
    }
    if (!this.email.valid) {
      this.toster.error('Email adresa nije ispravnog formata.', 'Greška!');
      return;
    }

    if (this.userType.value == 'patient') {
      if (this.password.value == '') {
        this.toster.error('Unesite lozinku.', 'Greška!');
        return;
      }
      if (this.confirmPassword.value == '') {
        this.toster.error('Unesite ponovljenu lozinku.', 'Greška!');
        return;
      }
      if (!this.password.valid) {
        this.toster.error(
          'Lozinka mora imati bar 8 karaktera, bar 1 malo slovo, bar 1 veliko slovo i bar jedan specijalni karakter.'
        );
        return;
      }

      if (this.confirmPassword.value != this.password.value) {
        this.toster.error('Lozinke se ne poklapaju.', 'Greška!');
        return;
      }
    }
    //provera da li email ili username vec postoje
    if (
      this.users.find((a) => a.username == this.username.value) != undefined
    ) {
      this.toster.error('Korisničko ime već postoji.', 'Greška!');
      return;
    }

    if (this.users.find((a) => a.email == this.email.value) != undefined) {
      this.toster.error('E-mail adresa već postoji.', 'Greška!');
      return;
    }

    let model: any = {
      username: this.username.value,
      firstname: this.firstName.value,
      lastname: this.lastName.value,
      email: this.email.value,
      password: this.password.value,
      usertype: this.userType.value,
    };

    if (this.userType.value == 'Doctor') {
      this.adminService
        .CreateDoctorRegisterRequest(model)
        .subscribe((res: any) => {
          if (res.success) {
            this.toster.success(
              'Uspešno ste se poslali prijavu za registraciju na sistem. Sačekajte potvrdu da Vam je odobren pristup.',
              'Čestitke!'
            );
            setTimeout(() => {
              this.router.navigate(['login']);
            }, 2000);
          } else {
            this.toster.success(
              'Dogodila se greška. Probajte ponovo,',
              'Greška!'
            );
          }
        });
    } else {
      this.adminService.RegisterPatient(model).subscribe((res: any) => {
        if (res.success) {
          this.toster.success(
            'Uspešno ste se registrovali na sistem. Prijavite se.',
            'Čestitke!'
          );
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        } else {
          this.toster.success(
            'Dogodila se greška. Probajte ponovo,',
            'Greška!'
          );
        }
      });
    }
  }

  toggleShow(whichOne: number) {
    if (whichOne == 1) this.hide1 = !this.hide1;
    else this.hide2 = !this.hide2;
  }
}
