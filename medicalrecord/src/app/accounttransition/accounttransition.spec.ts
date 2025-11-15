import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accounttransition } from './accounttransition';

describe('Accounttransition', () => {
  let component: Accounttransition;
  let fixture: ComponentFixture<Accounttransition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accounttransition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accounttransition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
