import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

interface Pet {
  petId: string;
  petName: string;
  age: number;
  gender: string;
  remarks: string;
  petType: string;
  ownerId: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  petList: Pet[] = [];
  loading = false;
  error: string | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllPets();
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
        this.http.delete(`http://localhost:8081/api/pet/${petId}`)
          .subscribe({
            next: () => {
              this.getAllPets(); // Refresh the list after deletion
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Pet has been deleted.',
              });
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error deleting pet:', error);
              Swal.fire({
                icon: 'error',
                title: 'Failed to delete pet',
                text: 'There was an issue deleting the pet. Please try again.',
              });
            }
          });
      }
    });
  }
}