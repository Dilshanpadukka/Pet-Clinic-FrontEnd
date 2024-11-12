import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LandingpageComponent } from "./auth/components/landingpage/landingpage.component";
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, LandingpageComponent, SignupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pet-clinic';
}
