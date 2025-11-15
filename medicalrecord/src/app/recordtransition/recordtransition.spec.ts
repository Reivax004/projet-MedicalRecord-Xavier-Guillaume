import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recordtransition } from './recordtransition';

describe('Recordtransition', () => {
  let component: Recordtransition;
  let fixture: ComponentFixture<Recordtransition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recordtransition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recordtransition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
