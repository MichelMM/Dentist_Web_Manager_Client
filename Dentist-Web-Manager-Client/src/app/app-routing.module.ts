import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {HomeComponent} from './pages/home/home.component'
import {FaqComponent} from './pages/faq/faq.component'
import {GalleryComponent} from './pages/gallery/gallery.component'
import {ContactComponent} from './pages/contact/contact.component'
import {AboutComponent} from './pages/about/about.component';
import {ServicesComponent} from './pages/services/services.component';

const routes: Routes = [  
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'FAQ', component: FaqComponent },
  { path: 'Gallery', component: GalleryComponent },
  { path: 'Contact', component: ContactComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Services', component: ServicesComponent },/*,
  { path: '**', component: Page404Component};*/
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
