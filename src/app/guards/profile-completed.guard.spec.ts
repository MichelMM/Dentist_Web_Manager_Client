import { TestBed } from '@angular/core/testing';

import { ProfileCompletedGuard } from './profile-completed.guard';

describe('ProfileCompletedGuard', () => {
  let guard: ProfileCompletedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileCompletedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
