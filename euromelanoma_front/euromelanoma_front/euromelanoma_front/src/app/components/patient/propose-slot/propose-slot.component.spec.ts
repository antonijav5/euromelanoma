import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposeSlotComponent } from './propose-slot.component';

describe('ProposeSlotComponent', () => {
  let component: ProposeSlotComponent;
  let fixture: ComponentFixture<ProposeSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposeSlotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProposeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
