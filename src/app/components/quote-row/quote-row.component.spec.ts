import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRowComponent } from './quote-row.component';

describe('QuoteRowComponent', () => {
  let component: QuoteRowComponent;
  let fixture: ComponentFixture<QuoteRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
