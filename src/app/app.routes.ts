import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './modules/admin/components/admin-dashboard/admin-dashboard.component';
import { PetownerDashboardComponent } from './modules/petowner/components/petowner-dashboard/petowner-dashboard.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { LandingpageComponent } from './auth/components/landingpage/landingpage.component';
import { AddPetComponent } from './modules/admin/components/add-pet/add-pet.component';
import { AppointmentsComponent } from './modules/admin/components/appointments/appointments.component';
import { AddAppointmentComponent } from './modules/admin/components/add-appointment/add-appointment.component';

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
        
    },
    {
        path: 'app-pet',
        component: AddPetComponent,
        
    },{
        path: 'appointments',
        component: AppointmentsComponent
    },
    {
        path: 'app-appointment',
        component: AddAppointmentComponent
    },
    {
        path: 'petowner',
        component: PetownerDashboardComponent
    }
];
