import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  http = inject(HttpClient);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

 
  constructor() {
    // Initialize the form with validation rules
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(8)]] // Password validation
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Please ensure all fields are correctly filled!',
      });
      return;
    }

    
    this.http.post("http://localhost:8081/api/auth/login", this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res.user?.id) {
          Swal.fire({
            icon: 'success',
            title: 'Login Successful',
            text: 'Welcome to the admin dashboard!',
          });
          console.log(res);
          
          // localStorage.setItem("pet-clinic", res);
          
          // localStorage.setItem("pet-clinic-user", res.jwt);
          // localStorage.setItem("pet-clinic-user-id", res.user.id);
          // localStorage.setItem("pet-clinic-user-name", res.user.name);
          // localStorage.setItem("pet-clinic-user-role", res.user.userRole);
          StorageService.saveToken(res.jwt);
          StorageService.saveUser(res.user);
          this.router.navigateByUrl('admin');
        
          
          
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'User ID not found.',
          });
        }
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'An error occurred during login. Please try again.',
        });
      }
    });
  }
  
 
}
