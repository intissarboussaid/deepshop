import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothesFashionComponent } from './clothes-fashion.component';

describe('ClothesFashionComponent', () => {
  let component: ClothesFashionComponent;
  let fixture: ComponentFixture<ClothesFashionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothesFashionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClothesFashionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
