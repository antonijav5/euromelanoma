import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.css'
})
export class UserRequestsComponent {
  requests: any[] = [];
  displayedColumns: string[] = ['firstname','lastname', 'mail', 'action'];
 
  constructor(private authService:AuthService,
              private adminService:AdminService,
              private toster:ToastrService
  ) {}
 
  ngOnInit(){
this.authService.getUserRequests().subscribe((res:any)=>{
  if (res.success) {
    this.requests=res.resultList;
  }
})
  }


  accept(data:any) {
    let model={
      username:data.username,
      firstName:data.firstName,
      lastName:data.lastName,
      email:data.email,
      password:"", //sad je empty, generise se.
      userType:"Doctor"
    }
this.adminService.RegisterDoctor(model).subscribe((res:any)=>{
  if (res.success) { 
    this.adminService.DeleteRequest(data.userID).subscribe((res:any)=>{
      if (!res.success) {
        this.toster.error("Nastala je greška.")
      }
      else {
        this.toster.success("Uspešno ste uneli lekara.", "Čestitke!")
        this.authService.getUserRequests().subscribe((res:any)=>{
          if (res.success) {
            this.requests=res.resultList;
          }
        })
      }
    })

  }
  else {
    this.toster.error("Lekar nije unet u sistem.", "Greška!")
  }
})


  }

  decline(id:number){
    this.adminService.DeleteRequest(id).subscribe((res:any)=>{
      if (!res.success) {
        this.toster.error("Nastala je greška.")
      }
    else {
      this.authService.getUserRequests().subscribe((res:any)=>{
        if (res.success) {
          this.requests=res.resultList;
        }
      })
    }
    })
  }
}
