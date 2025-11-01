import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCareProductComponent } from './self-care-product.component';

describe('SelfCareProductComponent', () => {
  let component: SelfCareProductComponent;
  let fixture: ComponentFixture<SelfCareProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfCareProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfCareProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
