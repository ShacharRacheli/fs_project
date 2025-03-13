import { Routes } from '@angular/router';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { LoginComponent } from '../components/login/login.component';
import { authGuard } from '../guards/auth.guard';
import { ChallengesComponent } from '../components/challenges/challenges.component';
import { AuthComponent } from '../components/auth/auth.component';
import { UsersComponent } from '../components/users/users.component';

export const routes: Routes = [
   { path: '', redirectTo: 'homePage', pathMatch: 'full' },
//    {path:'homePage',component:HomePageComponent},
   {path:'homePage',component:HomePageComponent,canActivate:[authGuard]},
   {path:'login',component:LoginComponent},
   {path:'challenges',component:ChallengesComponent},
   {path:'auth',component:AuthComponent},
   {path:'users',component:UsersComponent},


];
