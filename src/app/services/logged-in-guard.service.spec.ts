/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggedInGuardService } from './logged-in-guard.service';

describe('LoggedInGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedInGuardService]
    });
  });

  it('should ...', inject([LoggedInGuardService], (service: LoggedInGuardService) => {
    expect(service).toBeTruthy();
  }));
});
