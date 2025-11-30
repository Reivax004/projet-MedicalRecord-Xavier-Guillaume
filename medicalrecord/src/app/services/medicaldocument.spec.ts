import { TestBed } from '@angular/core/testing';

import { Medicaldocument } from './medicaldocument';

describe('Medicaldocument', () => {
  let service: Medicaldocument;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Medicaldocument);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
