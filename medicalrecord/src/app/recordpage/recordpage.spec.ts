import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recordpage } from './recordpage';

describe('Recordpage', () => {
  let component: Recordpage;
  let fixture: ComponentFixture<Recordpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recordpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recordpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
