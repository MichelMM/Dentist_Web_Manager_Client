import { TestBed } from '@angular/core/testing';

import { IsDentistGuard } from './is-dentist.guard';

describe('IsDentistGuard', () => {
  let guard: IsDentistGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsDentistGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
