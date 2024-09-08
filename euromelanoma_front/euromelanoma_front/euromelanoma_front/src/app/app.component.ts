import { Component } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/sr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'euromelanoma_front';

  constructor() {
    moment.locale('sr'); // Podesi lokalizaciju na srpski u konstruktoru
  }
}
