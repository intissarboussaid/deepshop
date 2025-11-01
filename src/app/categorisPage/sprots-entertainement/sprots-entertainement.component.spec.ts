import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprotsEntertainementComponent } from './sprots-entertainement.component';

describe('SprotsEntertainementComponent', () => {
  let component: SprotsEntertainementComponent;
  let fixture: ComponentFixture<SprotsEntertainementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprotsEntertainementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprotsEntertainementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
