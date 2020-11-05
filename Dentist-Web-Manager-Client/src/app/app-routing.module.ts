import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {ServicesComponent} from './pages/services/services.component';

const routes: Routes = [  
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Services', component: ServicesComponent },/*,
  { path: '**', component: Page404Component};*/
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
