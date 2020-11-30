import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistRegisterComponent } from './dentist-register.component';

describe('DentistRegisterComponent', () => {
  let component: DentistRegisterComponent;
  let fixture: ComponentFixture<DentistRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
