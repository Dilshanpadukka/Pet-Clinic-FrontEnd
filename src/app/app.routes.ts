import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { PetownerDashboardComponent } from './modules/petowner/components/petowner-dashboard/petowner-dashboard.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { LandingpageComponent } from './auth/components/landingpage/landingpage.component';
import { AddPetComponent } from './modules/admin/components/add-pet/add-pet.component';
import { AppointmentsComponent } from './modules/admin/components/appointments/appointments.component';
import { AddAppointmentComponent } from './modules/admin/components/add-appointment/add-appointment.component';
import { authGuard } from './auth/services/auth/guards/auth.guard';
import { ReportUploadComponent } from './modules/admin/components/report-upload/report-upload.component';
import { ReportListComponent } from './modules/admin/components/report-list/report-list.component';
import { PetsComponent } from './modules/admin/components/pets/pets.component';


export const routes: Routes = [
    {
        path: '',
        component: LandingpageComponent
    },
    {
        path: 'register',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [authGuard] // Protecting admin dashboard
    },
    {
        path: 'add-pet',
        component: AddPetComponent,
        canActivate: [authGuard] // Protecting add-pet
    },
    {
        path: 'appointments',
        component: AppointmentsComponent,
        canActivate: [authGuard] // Protecting appointments
    },
    {
        path: 'add-appointment',
        component: AddAppointmentComponent,
        canActivate: [authGuard] // Protecting add-appointment
    },
    {
        path: 'petowner',
        component: PetownerDashboardComponent,
        canActivate: [authGuard] // Protecting petowner dashboard
    },
    {
        path:'upload-report',
        component: ReportUploadComponent
    },
    {
        path: 'report-list',
        component: ReportListComponent
    },
    {
        path: 'pets',
        component: PetsComponent
    }
];
