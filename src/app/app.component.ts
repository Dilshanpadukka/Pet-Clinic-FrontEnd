import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LandingpageComponent } from "./auth/components/landingpage/landingpage.component";
import { FormsModule, NgModel } from '@angular/forms';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from "./modules/admin/components/common/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { StorageService } from './auth/services/storage/storage.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, LandingpageComponent, SignupComponent, NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'pet-clinic';

  isAdminLogedIn :boolean =StorageService.isAdminLoggedIn();

  ngOnInit():void{
    initFlowbite();
    // this.isAdminLogedIn = this.isAdminLoginIn();
    console.log(this.isAdminLogedIn);
    
  }

  // isAdminLoginIn(): boolean {
  //   console.log("Hello "+window.localStorage.getItem("pet-clinic-user-role"));
    
  //   if(window.localStorage.getItem("pet-clinic-user-role")=='PETOWNER') return true;
    
  //   return false;
  // }

 
}
