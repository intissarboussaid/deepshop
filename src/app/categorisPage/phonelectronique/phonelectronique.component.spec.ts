import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonelectroniqueComponent } from './phonelectronique.component';

describe('PhonelectroniqueComponent', () => {
  let component: PhonelectroniqueComponent;
  let fixture: ComponentFixture<PhonelectroniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhonelectroniqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhonelectroniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
