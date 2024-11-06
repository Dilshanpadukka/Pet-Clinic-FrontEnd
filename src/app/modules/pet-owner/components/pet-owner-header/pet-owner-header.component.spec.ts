import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetOwnerHeaderComponent } from './pet-owner-header.component';

describe('PetOwnerHeaderComponent', () => {
  let component: PetOwnerHeaderComponent;
  let fixture: ComponentFixture<PetOwnerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetOwnerHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetOwnerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
