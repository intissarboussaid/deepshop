import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyToyComponent } from './baby-toy.component';

describe('BabyToyComponent', () => {
  let component: BabyToyComponent;
  let fixture: ComponentFixture<BabyToyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BabyToyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BabyToyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
