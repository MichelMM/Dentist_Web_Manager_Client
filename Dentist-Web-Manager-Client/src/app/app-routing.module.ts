import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
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
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'FAQ', component: FaqComponent },
  { path: 'Gallery', component: GalleryComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Services', component: ServicesComponent },
  { path: 'Dentists', component: DentistsComponent },
  { path: 'Appointment', component: AppointmentComponent},
  { path: 'myAppointment', component: MyAppointmentsComponent},
  { path: 'login', component: LoginComponent},
  { path: '**', component: Page404Component}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
