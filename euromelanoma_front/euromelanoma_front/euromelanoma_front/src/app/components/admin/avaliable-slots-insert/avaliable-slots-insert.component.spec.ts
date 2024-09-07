import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliableSlotsInsertComponent } from './avaliable-slots-insert.component';

describe('AvaliableSlotsInsertComponent', () => {
  let component: AvaliableSlotsInsertComponent;
  let fixture: ComponentFixture<AvaliableSlotsInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliableSlotsInsertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvaliableSlotsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
