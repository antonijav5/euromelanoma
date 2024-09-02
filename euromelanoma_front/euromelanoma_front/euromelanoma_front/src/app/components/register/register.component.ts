import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide1 = true;
  hide2 = true;
  confirmPassword=new FormControl("")
  password=new FormControl("")
  email=new FormControl("")
  lastName=new FormControl("")
  firstName=new FormControl("")
  userType=new FormControl("patient")
  constructor (    private toster: ToastrService){

  }
onSubmit(){
  //insert u tabelu Users ukoliko je pacijent
  //insert u tabelu UserRequest za doktore, njih pregleda admin. Ukoliko odobri, generise se privremena lozinka i salje na mejl
if (this.firstName.value=="") {
  this.toster.error("Unesite ime.", "Greška!")
  return
}
if (this.lastName.value=="") {
  this.toster.error("Unesite prezime.", "Greška!")
  return
}
if (this.email.value=="") {
  this.toster.error("Unesite email adresu.", "Greška!")
  return
}
if (!this.email.valid) {
    this.toster.error("Email adresa nije ispravnog formata.", "Greška!")
    return
  }

}

toggleShow(whichOne: number) {
  if (whichOne==1)
  this.hide1 = !this.hide1;
else 
this.hide2 = !this.hide2;
}
}
