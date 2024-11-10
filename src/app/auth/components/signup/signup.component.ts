import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm: FormGroup;
  private http = inject(HttpClient);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  constructor() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      userRole: ['PETOWNER']
    }, { validator: this.passwordMatchValidator });
  }

  // Custom validator to ensure password and confirm password match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please fill all fields correctly.',
      });
      return;
    }
  
    // Create an object containing only the required data
    const signUpData = {
      name: this.signUpForm.get('name')?.value,
      email: this.signUpForm.get('email')?.value,
      userRole: this.signUpForm.get('userRole')?.value,
      password: this.signUpForm.get('password')?.value
    };
  
    // API call to register user with only the necessary data
    this.http.post("http://localhost:8081/api/auth/signup", signUpData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Welcome to PET MED CARE!',
        }).then(() => {
          this.router.navigate(['/login']); // Redirect to login page after success
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'There was a problem with your registration. Please try again.',
        });
      }
    });
  }
  
}
