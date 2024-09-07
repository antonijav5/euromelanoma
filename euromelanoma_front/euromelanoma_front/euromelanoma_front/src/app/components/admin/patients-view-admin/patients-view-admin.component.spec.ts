import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsViewAdminComponent } from './patients-view-admin.component';

describe('PatientsViewAdminComponent', () => {
  let component: PatientsViewAdminComponent;
  let fixture: ComponentFixture<PatientsViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsViewAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
