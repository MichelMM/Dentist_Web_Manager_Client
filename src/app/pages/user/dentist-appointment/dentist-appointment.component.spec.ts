import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistAppointmentComponent } from './dentist-appointment.component';

describe('DentistAppointmentComponent', () => {
  let component: DentistAppointmentComponent;
  let fixture: ComponentFixture<DentistAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
