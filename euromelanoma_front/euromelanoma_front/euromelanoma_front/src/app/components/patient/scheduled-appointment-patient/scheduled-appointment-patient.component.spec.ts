import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledAppointmentPatientComponent } from './scheduled-appointment-patient.component';

describe('ScheduledAppointmentPatientComponent', () => {
  let component: ScheduledAppointmentPatientComponent;
  let fixture: ComponentFixture<ScheduledAppointmentPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledAppointmentPatientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduledAppointmentPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
