import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  @Input() item = 'view';
  constructor(private authService: AuthService) {}
  @Input() selectedTab: number = 0; // Prima tab index od home komponente

  getCurrentComponent(): string {
    switch (this.selectedTab) {
      case 0:
        return 'patients-view';
      case 1:
        return 'patients-by-city';
      case 2:
        return 'available-slots';
      case 3:
        return 'user-requests';
      default:
        return 'patients-view';
    }
  }

  handleNotification(change: any) {}
}
