import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCategorisComponent } from './home-categoris.component';

describe('HomeCategorisComponent', () => {
  let component: HomeCategorisComponent;
  let fixture: ComponentFixture<HomeCategorisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCategorisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCategorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
