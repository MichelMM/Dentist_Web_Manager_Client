import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DentistLoginComponent } from './dentist-login.component';

describe('DentistLoginComponent', () => {
  let component: DentistLoginComponent;
  let fixture: ComponentFixture<DentistLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DentistLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DentistLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
