import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Followuprecord } from './followuprecord';

describe('Followuprecord', () => {
  let component: Followuprecord;
  let fixture: ComponentFixture<Followuprecord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Followuprecord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Followuprecord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
