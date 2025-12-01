import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPage } from './recordpage';

describe('Recordpage', () => {
  let component: RecordPage;
  let fixture: ComponentFixture<RecordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
