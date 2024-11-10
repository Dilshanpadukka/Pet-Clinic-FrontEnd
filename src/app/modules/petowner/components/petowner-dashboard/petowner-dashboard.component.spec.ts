import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetownerDashboardComponent } from './petowner-dashboard.component';

describe('PetownerDashboardComponent', () => {
  let component: PetownerDashboardComponent;
  let fixture: ComponentFixture<PetownerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetownerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetownerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
