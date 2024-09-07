import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsByCityComponent } from './patients-by-city.component';

describe('PatientsByCityComponent', () => {
  let component: PatientsByCityComponent;
  let fixture: ComponentFixture<PatientsByCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsByCityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsByCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
