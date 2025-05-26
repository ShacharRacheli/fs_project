import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { usersChallengesGuard } from './users-challenges.guard';

describe('usersChallengesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => usersChallengesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
