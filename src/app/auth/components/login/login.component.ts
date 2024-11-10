import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "email": "",
    "password": ""
  };

  http = inject(HttpClient);
  router = inject(Router);
  onLogin() {

    this.http.post("http://localhost:8081/api/auth/login", this.loginObj).subscribe({
      next: (res: any) => {
        console.log(res.user.id);
        if (res.user.id != undefined) {
          alert("Login Success");
          this.router.navigateByUrl('admin');
        } else {
          alert("Login Failed");
        }
      },
      error: (err: any) => {
        alert("Login Failed");
      }
    }
    )
  }
}