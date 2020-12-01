import { TestBed } from '@angular/core/testing';

import { IsPatientGuard } from './is-patient.guard';

describe('UserTypeGuard', () => {
  let guard: IsPatientGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsPatientGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
