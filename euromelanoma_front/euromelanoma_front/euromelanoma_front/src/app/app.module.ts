import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';

import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PatientComponent } from './components/patient/patient.component';
import { LoginComponent } from './components/login/login.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { RegisterComponent } from './components/register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminComponent } from './components/admin/admin.component';
import { TooltipPosition, MatTooltipModule } from '@angular/material/tooltip';
import { PatientsByCityComponent } from './components/admin/patients-by-city/patients-by-city.component';
import { PatientsViewAdminComponent } from './components/admin/patients-view-admin/patients-view-admin.component';
import { AvaliableSlotsInsertComponent } from './components/admin/avaliable-slots-insert/avaliable-slots-insert.component';
import { ScheduledAppointmentPatientComponent } from './components/patient/scheduled-appointment-patient/scheduled-appointment-patient.component';
import { QuestionnaireComponent } from './components/patient/questionnaire/questionnaire.component';
import { AgeDifferenceExposureComponent } from './components/patient/questionnaire/age-difference-exposure/age-difference-exposure.component';
import { ProposeSlotComponent } from './components/patient/propose-slot/propose-slot.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { MatTableModule } from '@angular/material/table';
import { UserRequestsComponent } from './components/admin/user-requests/user-requests.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { MatListModule } from '@angular/material/list';
import { ExaminationResultsComponent } from './components/patient/examination-results/examination-results.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AboutUsComponent } from './components/about-us/about-us.component';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY', // Format za unos datuma
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PatientComponent,
    LoginComponent,
    DoctorComponent,
    RegisterComponent,
    AdminComponent,
    PatientsByCityComponent,
    PatientsViewAdminComponent,
    AvaliableSlotsInsertComponent,
    ScheduledAppointmentPatientComponent,
    QuestionnaireComponent,
    AgeDifferenceExposureComponent,
    ProposeSlotComponent,
    UserRequestsComponent,
    ResetPasswordComponent,
    ResetPasswordRequestComponent,
    ExaminationResultsComponent,
    AboutUsComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,

    //MATERIAL

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDividerModule,
    MatDialogModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatProgressBarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 3000,
      preventDuplicates: true,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    provideMomentDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'sr' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class AppModule {}
