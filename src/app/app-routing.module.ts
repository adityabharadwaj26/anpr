import { AuthGuard } from './core/auth/auth.guard';
import { PlateComponent } from './plate/plate.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './core/login-page/login-page.component';


const routes: Routes = [
  { path: '', component: PlateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
