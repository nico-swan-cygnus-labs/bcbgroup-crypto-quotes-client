import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSignalsComponent } from './cc-signals.component';

describe('CcSignalsComponent', () => {
  let component: CcSignalsComponent;
  let fixture: ComponentFixture<CcSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcSignalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
