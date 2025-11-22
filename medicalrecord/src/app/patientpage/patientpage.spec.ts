import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patientpage } from './patientpage';

describe('Patientpage', () => {
  let component: Patientpage;
  let fixture: ComponentFixture<Patientpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Patientpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Patientpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
