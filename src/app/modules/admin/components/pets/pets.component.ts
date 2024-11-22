import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';
import { NavbarComponent } from "../common/navbar/navbar.component";

interface Pet {
  petId: string;
  petName: string;
  age: number;
  gender: string;
  remarks: string;
  petType: string;
  ownerName: string;
  ownerPhoneNumber: string;
  ownerEmail: string;
  ownerAddress: string;
}

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent],
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  petList: Pet[] = [];
  loading = false;
  error: string | null = null;
  userId: string | null | undefined;
  userName: string | null | undefined;
  selectedPet: Pet = {
    petId: '',
    petName: '',
    age: 0,
    gender: '',
    remarks: '',
    petType: '',
    ownerName: '',
    ownerPhoneNumber: '',
    ownerEmail: '',
    ownerAddress: ''
  };
  private updateModal: Modal | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log("Hello");
    this.getAllPets();
    this.userId = localStorage.getItem("pet-clinic-user-id");
    this.userName = localStorage.getItem("pet-clinic-user-name");
    
  }

  openUpdateModal(pet: Pet) {
    this.selectedPet = { ...pet }; // Create a copy of the pet object
    const modalElement = document.getElementById('updatePetModal');
    if (modalElement) {
      this.updateModal = new Modal(modalElement);
      this.updateModal.show();
    }
  }

  updatePet() {
    this.http.put<{message: string}>('http://localhost:8081/api/pet/pet-update-by-id', this.selectedPet)
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: response.message,
          });
          this.updateModal?.hide();
          this.getAllPets();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating pet:', error);
          Swal.fire({
            icon: 'error',
            title: 'Failed to update pet',
            text: error.error.message || 'There was an issue updating the pet information.',
          });
        }
      });
  }

  getAllPets() {
    this.loading = true;
    this.error = null;

    this.http.get('http://localhost:8081/api/pet/pet-get-all')
      .subscribe({
        next: (response: any) => {
          if (Array.isArray(response)) {
            this.petList = response;
          } else {
            console.error('Unexpected response structure:', response);
            this.error = 'Invalid data format received from server';
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching pets:', error);
          this.error = 'Failed to load pets. Please try again later.';
          this.loading = false;
        }
      });
  }

  deletePetById(petId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<{message: string}>(`http://localhost:8081/api/pet/pet-delete-by-id/${petId}`)
          .subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: response.message,
              });
              this.getAllPets();
              
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error deleting pet:', error);
              Swal.fire({
                icon: 'error',
                title: 'Failed to delete pet',
                text: error.error.message || 'There was an issue deleting the pet.',
              });
            }
          });
      }
    });
}

}