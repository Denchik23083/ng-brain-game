import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { ProfilePageComponent } from './pages/user/profile-page/profile-page.component';
import { PermissionGuard } from './utils/permission.guard';
import { Permission } from './services/auth/auth.service';
import { QuizzesPageComponent } from './pages/brain/quizzes-page/quizzes-page.component';
import { RemoveUserPageComponent } from './pages/user/remove-user-page/remove-user-page.component';
import { UserToAdminPageComponent } from './pages/user/user-to-admin-page/user-to-admin-page.component';
import { AdminToUserPageComponent } from './pages/user/admin-to-user-page/admin-to-user-page.component';
import { EditPageComponent } from './pages/user/edit-page/edit-page.component';
import { PasswordPageComponent } from './pages/user/password-page/password-page.component';
import { StatisticsPageComponent } from './pages/main/statistics-page/statistics-page.component';
import { GamePageComponent } from './pages/brain/game-page/game-page.component';
import { PointsPageComponent } from './pages/brain/points-page/points-page.component';
import { AddQuizzesPageComponent } from './pages/brain/add-quizzes-page/add-quizzes-page.component';
import { UpdateQuizzesPageComponent } from './pages/brain/update-quizzes-page/update-quizzes-page.component';
import { ViewPageComponent } from './pages/brain/view-page/view-page.component';
import { AddViewPageComponent } from './pages/brain/add-view-page/add-view-page.component';
import { UpdateViewPageComponent } from './pages/brain/update-view-page/update-view-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  {
    path: 'profile', 
    component: ProfilePageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
  { 
    path: 'profile/edit', 
    component: EditPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
  { 
    path: 'profile/edit/password', 
    component: PasswordPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
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
    path: 'statistics', 
    component: StatisticsPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
  { 
    path: 'quizzes', 
    component: QuizzesPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
  { 
    path: 'quizzes/add', 
    component: AddQuizzesPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.editQuiz] }
  },
  { 
    path: 'quizzes/:id', 
    component: GamePageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
  { 
    path: 'quizzes/:id/view', 
    component: ViewPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
  { 
    path: 'quizzes/:id/view/add', 
    component: AddViewPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.editQuiz] }
  },
  { 
    path: 'quizzes/:id/view/:questionId/edit', 
    component: UpdateViewPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.editQuiz] }
  },
  { 
    path: 'quizzes/:id/points', 
    component: PointsPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.getQuiz] }
  },
  { 
    path: 'quizzes/:id/edit', 
    component: UpdateQuizzesPageComponent,
    canActivate: [PermissionGuard],
    data: { permissions: [Permission.editQuiz] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PermissionGuard]
})
export class AppRoutingModule { }
