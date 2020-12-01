import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component'
import { FaqComponent } from './pages/faq/faq.component'
import { GalleryComponent } from './pages/gallery/gallery.component'
import { ContactComponent } from './pages/contact/contact.component'
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { DentistsComponent } from './pages/dentists/dentists.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { MyAppointmentsComponent } from './pages/user/my-appointments/my-appointments.component';
import { Page404Component } from './pages/page404/page404.component';
import { RegisterComponent } from './pages/register/register.component';
import { DentistRegisterComponent } from './pages/dentist-register/dentist-register.component';
import { AuthGuard } from "./guards/auth.guard"
import { UnauthGuard } from "./guards/unauth.guard"
import { ProfileComponent } from './pages/user/profile/profile.component';
import { DentistLoginComponent } from './pages/dentist-login/dentist-login.component';
import { DentistAppointmentComponent } from './pages/user/dentist-appointment/dentist-appointment.component';
import { ProfileCompletedGuard } from './guards/profile-completed.guard';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'FAQ', component: FaqComponent },
  { path: 'Gallery', component: GalleryComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Services', component: ServicesComponent },
  { path: 'Dentists', component: DentistsComponent },
  { path: 'Appointment', component: AppointmentComponent, canActivate:[AuthGuard, ProfileCompletedGuard]},
  { path: 'user/myAppointment', component: MyAppointmentsComponent, canActivate:[AuthGuard, ProfileCompletedGuard]},
  { path: 'user/profile', component: ProfileComponent, canActivate:[AuthGuard]},
  { path: 'dentist/myAppointment', component: DentistAppointmentComponent},
  { path: 'register', component: RegisterComponent, canActivate:[UnauthGuard]},
  { path: 'dentistRegister', component: DentistRegisterComponent, canActivate:[UnauthGuard]},
  { path: 'dentistLogin', component: DentistLoginComponent, canActivate:[UnauthGuard]},
  { path: '**', component: Page404Component}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
