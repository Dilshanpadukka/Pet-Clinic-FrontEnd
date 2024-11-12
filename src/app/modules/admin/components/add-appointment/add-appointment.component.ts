import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpRequest } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent {
  appointmentForm: FormGroup;
  private http = inject(HttpClient);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.appointmentForm = this.formBuilder.group({
      ownerName: ['', Validators.required],
      petId: ['', Validators.required],
      categoryId: ['', Validators.required],
      petType: ['', Validators.required],
      petName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  // Helper function to convert 12-hour time format to 24-hour format
  private convertTo24Hour(time12h: string): string {
    if (!time12h) return '';
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && +hours < 12) {
      hours = String(+hours + 12);
    }
    if (modifier === 'AM' && +hours === 12) {
      hours = '00';
    }

    return `${hours}:${minutes}`;
  }

  // Function to format the date to yyyy-MM-dd
  private formatDate(dateString: string): string {
    if (!dateString) return '';
    const [month, day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  onAddAppointment() {
    console.log(this.appointmentForm.value);
  
    if (this.appointmentForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill all fields correctly.',
      });
      return;
    }
  
    // Get the form values
    const formData = this.appointmentForm.value;
  
    // Format date and time
    const formattedDate = formData.date; // The date is already in yyyy-MM-dd format
    const formattedTime = formData.time; // Ensure time is in HH:mm format, no need to convert
  
    const appointmentData = {
      ...formData,
      date: formattedDate,  // Send the formatted date
      time: formattedTime,  // Send the formatted time
    };
  
    // Make the POST request to backend
    this.http.post("http://localhost:8081/api/appointment/add-appointment", appointmentData).subscribe({
      next: (res: any) => {
      console.log(res);
      
        Swal.fire({
          icon: 'success',
          title: 'Appointment Added!',
          text: 'The appointment has been successfully added.',
        }).then(() => {
          this.router.navigate(['/appointments']);  // Navigate to the appointments list
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
