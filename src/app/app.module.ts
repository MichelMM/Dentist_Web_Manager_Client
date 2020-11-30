import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { FaqComponent } from './pages/faq/faq.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import {​​ HttpClientModule }​​ from '@angular/common/http';
import { DentistsComponent } from './pages/dentists/dentists.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { MyAppointmentsComponent } from './pages/user/my-appointments/my-appointments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';

import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrModule } from 'ngx-toastr';

import { environment } from 'src/environments/environment';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { DentistRegisterComponent } from './pages/dentist-register/dentist-register.component';
import { DentistLoginComponent } from './pages/dentist-login/dentist-login.component';
import { DentistAppointmentComponent } from './pages/user/dentist-appointment/dentist-appointment.component';
import {MatDialogModule} from '@angular/material/dialog'
import {MatButtonModule} from '@angular/material/button';
import { DialogComponent } from './components/dialog/dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FaqComponent,
    GalleryComponent,
    ContactComponent,
    AboutComponent,
    ServicesComponent,
    DentistsComponent,
    AppointmentComponent,
    MyAppointmentsComponent,
    RegisterComponent,
    DentistRegisterComponent,
    ProfileComponent,
    DentistLoginComponent,
    DentistAppointmentComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents:[DialogComponent],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.clientId
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
