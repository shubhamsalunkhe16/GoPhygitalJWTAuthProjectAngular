import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserhomeComponent } from './pages/user/userhome/userhome.component';
import { AdminGuard } from './services/adminGuard/admin.guard';
import { UserGuard } from './services/userGuard/user.guard';

const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserhomeComponent,
    pathMatch: 'full',
    canActivate:[UserGuard],
  },
  {
    path: 'admin',
    component: AdminhomeComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
