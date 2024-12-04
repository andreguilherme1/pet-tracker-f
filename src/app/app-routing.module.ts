import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetTrackerComponent } from './components/pet-tracker/pet-tracker.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pet-tracker', component: PetTrackerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
