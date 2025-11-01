import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAccessoiresComponent } from './car-accessoires.component';

describe('CarAccessoiresComponent', () => {
  let component: CarAccessoiresComponent;
  let fixture: ComponentFixture<CarAccessoiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarAccessoiresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarAccessoiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
