import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenHomeEssentialsComponent } from './kitchen-home-essentials.component';

describe('KitchenHomeEssentialsComponent', () => {
  let component: KitchenHomeEssentialsComponent;
  let fixture: ComponentFixture<KitchenHomeEssentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KitchenHomeEssentialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitchenHomeEssentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
