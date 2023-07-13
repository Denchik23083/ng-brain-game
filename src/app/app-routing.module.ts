import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/brain/game/game.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { EditComponent } from './components/user/edit/edit.component';
import { PointsComponent } from './components/brain/points/points.component';
import { NewComponent } from './components/brain/new/new.component';
import { PasswordComponent } from './components/user/password/password.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { ProfilePageComponent } from './pages/user/profile-page/profile-page.component';
import { PermissionGuard } from './utils/permission.guard';
import { Permission } from './services/auth.service';
import { QuizzesPageComponent } from './pages/brain/quizzes-page/quizzes-page.component';
import { RemoveUserPageComponent } from './pages/user/remove-user-page/remove-user-page.component';
import { UserToAdminPageComponent } from './pages/user/user-to-admin-page/user-to-admin-page.component';
import { AdminToUserPageComponent } from './pages/user/admin-to-user-page/admin-to-user-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'profile/edit', component: EditComponent},
  { path: 'profile/edit/password', component: PasswordComponent},
  { 
    path: 'profile/removeuser', 
    component: RemoveUserPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.removeUser] }
  },
  { 
    path: 'profile/usertoadmin', 
    component: UserToAdminPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.userToAdmin] }
  },
  { 
    path: 'profile/admintouser', 
    component: AdminToUserPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.adminToUser] }
  },  
  { 
    path: 'quizzes', 
    component: QuizzesPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
  { path: 'quizzes/statistics', component: StatisticsComponent},  
  { path: 'quizzes/new', component: NewComponent},
  { path: 'quizzes/new/game', component: GameComponent},
  { path: 'quizzes/new/game/points', component: PointsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionGuard]
})
export class AppRoutingModule { }
