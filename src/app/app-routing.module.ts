import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/brain/game/game.component';
import { QuizzesComponent } from './components/brain/quizzes/quizzes.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { EditComponent } from './components/user/edit/edit.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { PointsComponent } from './components/brain/points/points.component';
import { NewComponent } from './components/brain/new/new.component';
import { PasswordComponent } from './components/user/password/password.component';
import { AuthPageComponent } from './pages/auth/auth-page/auth-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { ProfilePageComponent } from './pages/user/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'main/profile', component: ProfilePageComponent},
  { path: 'main/quizzes/statistics', component: StatisticsComponent},
  { path: 'main/quizzes', component: QuizzesComponent},
  { path: 'main/quizzes/new', component: NewComponent},
  { path: 'main/quizzes/new/game', component: GameComponent},
  { path: 'main/quizzes/new/game/points', component: PointsComponent},
  { path: 'main/profile/edit', component: EditComponent},
  { path: 'main/profile/edit/password', component: PasswordComponent},
  { path: 'main/profile/delete', component: DeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
