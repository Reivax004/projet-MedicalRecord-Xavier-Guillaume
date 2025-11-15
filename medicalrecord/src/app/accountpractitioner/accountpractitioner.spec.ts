import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Accountpractitioner } from './accountpractitioner';

describe('Accountpractitioner', () => {
  let component: Accountpractitioner;
  let fixture: ComponentFixture<Accountpractitioner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Accountpractitioner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Accountpractitioner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
