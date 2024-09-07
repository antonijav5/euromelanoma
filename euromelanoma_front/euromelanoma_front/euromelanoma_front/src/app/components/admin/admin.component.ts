import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnChanges {

@Input() item = 'view'; 
constructor(private authService:AuthService,      
){ }

ngOnChanges(changes: SimpleChanges) {
  if (changes['item']) {
    const previousValue = changes['item'].previousValue;
    const currentValue = changes['item'].currentValue;
  }
}
  handleNotification(change:any) {
  }

}
