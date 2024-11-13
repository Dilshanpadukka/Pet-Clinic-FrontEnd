import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';

interface Appointment {
  appointmentId: string;
  description: string;
  date: string;
  time: string;
  categoryId: string;
  petId: string;
  petName: string;
  petType: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointmentList: Appointment[] = [];
  loading = false;
  error: string | null = null;
  selectetAppointment: Appointment = {
    appointmentId: '',
    description: '',
    date: '',
    time: '',
    categoryId: '',
    petId: '',
    petName: '',
    petType: '',
    ownerName: '',
    phoneNumber: '',
    email: ''
  };

  private updateModal: Modal | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.loading = true;
    this.error = null;

    this.http.get('http://localhost:8081/api/appointment/get-all-appointments')
      .subscribe({
        next: (response: any) => {
          if (Array.isArray(response)) {
            this.appointmentList = response;
          } else {
            console.error('Unexpected response structure:', response);
            this.error = 'Invalid data format received from server';
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching appointments:', error);
          this.error = 'Failed to load appointments. Please try again later.';
          this.loading = false;
        }
      });
  }

  openUpdateModal(appointment: Appointment) {
    this.selectetAppointment = { ...appointment }; // Create a copy of the appointment object
    const modalElement = document.getElementById('updatePetModal');
    if (modalElement) {
      this.updateModal = new Modal(modalElement);
      this.updateModal.show();
    }
  }

  updatePet() {
    // Format the date to 'yyyy-MM-dd'
    const formattedDate = this.selectetAppointment.date
      ? formatDate(this.selectetAppointment.date, 'yyyy-MM-dd', 'en-US')
      : '';

    // Format the time to 'HH:mm'
    const formattedTime = this.selectetAppointment.time
      ? this.selectetAppointment.time.slice(0, 5)
      : '';

    // Prepare the updated appointment with formatted date and time
    const updatedAppointment = {
      ...this.selectetAppointment,
      date: formattedDate,
      time: formattedTime
    };

    // Send the HTTP PUT request with formatted date and time
    this.http.put<{ message: string }>(
      'http://localhost:8081/api/appointment/update-appointment',
      updatedAppointment
    ).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: response.message,
        });
        this.updateModal?.hide();
        this.getAllAppointments();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating appointment:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to update appointment',
          text: error.error.message || 'There was an issue updating the appointment information.',
        });
      }
    });
  }
  deleteAppointmentById(appointmentId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete<{message: string}>(`http://localhost:8081/api/appointment/delete-appointment-by-id/${appointmentId}`)
          .subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: response.message,
              });
              this.getAllAppointments();
            },
            error: (error: HttpErrorResponse) => {
              console.error('Error deleting Appointment:', error);
              Swal.fire({
                icon: 'error',
                title: 'Failed to delete Appointment',
                text: error.error.message || 'There was an issue deleting the Appointment.',
              });
            }
          });
      }
    });
}
}
