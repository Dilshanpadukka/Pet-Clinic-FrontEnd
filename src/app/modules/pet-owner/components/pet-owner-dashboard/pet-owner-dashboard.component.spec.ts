import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetOwnerDashboardComponent } from './pet-owner-dashboard.component';

describe('PetOwnerDashboardComponent', () => {
  let component: PetOwnerDashboardComponent;
  let fixture: ComponentFixture<PetOwnerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetOwnerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetOwnerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
