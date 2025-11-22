import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Praticionerpage } from './practitionerpage';

describe('Praticionerpage', () => {
  let component: Praticionerpage;
  let fixture: ComponentFixture<Praticionerpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Praticionerpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Praticionerpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
