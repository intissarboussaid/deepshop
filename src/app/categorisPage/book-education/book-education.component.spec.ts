import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEducationComponent } from './book-education.component';

describe('BookEducationComponent', () => {
  let component: BookEducationComponent;
  let fixture: ComponentFixture<BookEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
