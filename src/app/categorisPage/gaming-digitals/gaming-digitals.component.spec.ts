import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingDigitalsComponent } from './gaming-digitals.component';

describe('GamingDigitalsComponent', () => {
  let component: GamingDigitalsComponent;
  let fixture: ComponentFixture<GamingDigitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamingDigitalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamingDigitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
