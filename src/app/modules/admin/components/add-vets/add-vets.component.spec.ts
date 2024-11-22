import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVetsComponent } from './add-vets.component';

describe('AddVetsComponent', () => {
  let component: AddVetsComponent;
  let fixture: ComponentFixture<AddVetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
