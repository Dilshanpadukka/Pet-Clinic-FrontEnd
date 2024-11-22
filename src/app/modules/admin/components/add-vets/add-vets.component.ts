import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NavbarComponent } from "../common/navbar/navbar.component";
@Component({
  selector: 'app-add-vets',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, NavbarComponent],
  templateUrl: './add-vets.component.html',
  styleUrl: './add-vets.component.css'
})
export class AddVetsComponent {
  vetForm: FormGroup;
  selectedFile: File | null = null;
  private http = inject(HttpClient);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.vetForm = this.formBuilder.group({
      vetName: ['', Validators.required],
      regNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onAddVet() {
    if (this.vetForm.invalid || !this.selectedFile) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill all fields correctly and select a profile picture.',
      });
      return;
    }

    const formData = new FormData();
    const vetData = this.vetForm.value;
    
    formData.append('vet', new Blob([JSON.stringify(vetData)], {
      type: 'application/json'
    }));
    formData.append('profilePicture', this.selectedFile);

    this.http.post("http://localhost:8081/api/vet", formData).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'New Veterinarian Added!',
          text: 'The Veterinarian has been successfully added.',
        }).then(() => {
          this.router.navigate(['/veterinarians']);
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