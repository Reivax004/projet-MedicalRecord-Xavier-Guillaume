import { TestBed } from '@angular/core/testing';

import { Followuprecord } from './followuprecord';

describe('Followuprecord', () => {
  let service: Followuprecord;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Followuprecord);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
