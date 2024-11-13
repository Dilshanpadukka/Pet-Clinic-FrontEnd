// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string | null | undefined;
  userName: string | null | undefined;
  isDropdownOpen = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem("pet-clinic-user");
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        this.userId = parsedUser.id;
        this.userName = parsedUser.name;
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(): void {
    // Clear local storage
    //localStorage.removeItem('pet-clinic-user');
    StorageService.logout();
    window.location.reload();
    // Add any other logout logic here
    
    // Navigate to login page
    this.isDropdownOpen = false;
 
    this.router.navigate(['/login']);
  }
}