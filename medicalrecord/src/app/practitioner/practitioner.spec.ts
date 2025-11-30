import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Practitioner } from './practitioner';

describe('Practitioner', () => {
  let component: Practitioner;
  let fixture: ComponentFixture<Practitioner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Practitioner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Practitioner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
