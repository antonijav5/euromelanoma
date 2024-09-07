import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeDifferenceExposureComponent } from './age-difference-exposure.component';

describe('AgeDifferenceExposureComponent', () => {
  let component: AgeDifferenceExposureComponent;
  let fixture: ComponentFixture<AgeDifferenceExposureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgeDifferenceExposureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgeDifferenceExposureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
