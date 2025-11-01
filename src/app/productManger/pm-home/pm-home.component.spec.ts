import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmHomeComponent } from './pm-home.component';

describe('PmHomeComponent', () => {
  let component: PmHomeComponent;
  let fixture: ComponentFixture<PmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PmHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
