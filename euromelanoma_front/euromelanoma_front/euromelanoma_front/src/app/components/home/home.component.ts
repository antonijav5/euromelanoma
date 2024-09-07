import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
user:any={}
currentItem:string='view'

@Output() newItemEvent = new EventEmitter<string>();


constructor(private authService:AuthService){}
ngOnInit() {
let user_help=sessionStorage.getItem("auth-user")

  if (user_help) 
    {
      this.user=JSON.parse(user_help);
    }
  else this.user={}

  
}
logout(){
  this.authService.signOut()
}
goTo(selectView:string){
  this.currentItem=selectView
  this.newItemEvent.emit(this.currentItem)
}
}
