import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allpractitionners } from './allpractitionners';

describe('Allpractitionners', () => {
  let component: Allpractitionners;
  let fixture: ComponentFixture<Allpractitionners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allpractitionners]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allpractitionners);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
