import { TestBed } from '@angular/core/testing';

import { PractitionerService } from './practitioners';

describe('Practitioners', () => {
  let service: PractitionerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PractitionerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
