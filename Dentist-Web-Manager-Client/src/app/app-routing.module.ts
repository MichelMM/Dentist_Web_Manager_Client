import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {HomeComponent} from './pages/home/home.component'

const routes: Routes = [  
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent }/*,
  { path: '**', component: Page404Component};*/
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
