import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionerPage } from './practitionerpage';

describe('Praticionerpage', () => {
  let component: PractitionerPage;
  let fixture: ComponentFixture<PractitionerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PractitionerPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PractitionerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});