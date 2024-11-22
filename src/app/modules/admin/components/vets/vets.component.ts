import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { NavbarComponent } from "../common/navbar/navbar.component";

interface Vet {
  vetId: number;
  vetName: string;
  regNo: string;
  email: string;
  contactNumber: string;
  profilePictureData: string;
  profilePictureType: string;
}

@Component({
  selector: 'app-vets',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent],
  templateUrl: './vets.component.html',
  styleUrls: ['./vets.component.css']
})
export class VetsComponent implements OnInit {
  vetList: Vet[] = [];
  loading = false;
  error: string | null = null;
  selectedVet: Vet = {
    vetId: 0,
    vetName: '',
    regNo: '',
    email: '',
    contactNumber: '',
    profilePictureData: '',
    profilePictureType: ''
  };
  selectedFile: File | null = null;
  previewImage: string | null = null;
  private updateModal: Modal | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllVets();
  }

  getAllVets() {
    this.loading = true;
    this.error = null;

    this.http.get('http://localhost:8081/api/vet')
      .subscribe({
        next: (response: any) => {
          if (Array.isArray(response)) {
            this.vetList = response;
          } else {
            console.error('Unexpected response structure:', response);
            this.error = 'Invalid data format received from server';
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching vets:', error);
          this.error = 'Failed to load vets. Please try again later.';
          this.loading = false;
        }
      });
  }

  openUpdateModal(vet: Vet) {
    this.selectedVet = { ...vet };
    this.previewImage = vet.profilePictureData ? 
      `data:${vet.profilePictureType};base64,${vet.profilePictureData}` : null;
    const modalElement = document.getElementById('updateVetModal');
    if (modalElement) {
      this.updateModal = new Modal(modalElement);
      this.updateModal.show();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateVet() {
    const formData = new FormData();
    formData.append('vet', new Blob([JSON.stringify(this.selectedVet)], {
      type: 'application/json'
    }));
    
    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    this.http.put<Vet>(`http://localhost:8081/api/vet/${this.selectedVet.vetId}`, formData)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Vet information updated successfully',
          });
          this.updateModal?.hide();
          this.getAllVets();
        },
        error: (error: HttpErrorResponse) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to update vet',
            text: error.error.message || 'There was an issue updating the vet information.',
          });
        }
      });
  }

  deleteVetById(vetId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:8081/api/vet/${vetId}`)
          .subscribe({
            next: () => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Vet has been deleted.',
              });
              this.getAllVets();
            },
            error: (error: HttpErrorResponse) => {
              Swal.fire({
                icon: 'error',
                title: 'Failed to delete vet',
                text: error.error.message || 'There was an issue deleting the vet.',
              });
            }
          });
      }
    });
  }
}