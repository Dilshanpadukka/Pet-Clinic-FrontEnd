import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from "../common/navbar/navbar.component";


@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.css'
})
export class AddPetComponent {

  petForm: FormGroup;
  private http = inject(HttpClient);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.petForm = this.formBuilder.group({
      petName: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      remarks: ['', Validators.required],
      petType : ['', Validators.required],
      ownerName: ['', Validators.required],
      ownerPhoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      ownerEmail: ['', [Validators.required, Validators.email]],
      ownerAddress: ['', Validators.required]
    });
  }


  onAddPet() {
    console.log(this.petForm.value);
  
    if (this.petForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill all fields correctly.',
      });
      return;
    }
  
    // Get the form values
    const formData = this.petForm.value;

    console.log(formData);
    
  
    // Make the POST request to backend
    this.http.post("http://localhost:8081/api/pet/add-pet", formData).subscribe({
      next: (res: any) => {
      console.log(res);
      
        Swal.fire({
          icon: 'success',
          title: 'New Pet Added!',
          text: 'The Pet has been successfully added.',
        }).then(() => {
          this.router.navigate(['/pets']);  // Navigate to the pets list
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Could not connect to the server. Please try again later.',
        });
      }
    });
  }
  
}
