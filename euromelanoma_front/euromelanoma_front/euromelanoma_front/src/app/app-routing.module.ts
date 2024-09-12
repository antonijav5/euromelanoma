import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordRequestComponent } from './components/reset-password-request/reset-password-request.component';
import { ProposeSlotComponent } from './components/patient/propose-slot/propose-slot.component';

const routes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'forgot-password', component: ResetPasswordRequestComponent },
    { path: 'propose', component: ProposeSlotComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' } // Wildcard ruta za nepostojeće rute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
