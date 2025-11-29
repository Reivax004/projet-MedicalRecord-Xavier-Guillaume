import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Followuppage } from './followuppage';

describe('Followuppage', () => {
  let component: Followuppage;
  let fixture: ComponentFixture<Followuppage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Followuppage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Followuppage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
