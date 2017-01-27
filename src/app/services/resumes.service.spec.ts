/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ResumesService } from './resumes.service';

describe('ResumesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResumesService]
    });
  });

  it('should ...', inject([ResumesService], (service: ResumesService) => {
    expect(service).toBeTruthy();
  }));
});
