import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/brain/game/game.component';
import { QuizzesComponent } from './components/brain/quizzes/quizzes.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { EditComponent } from './components/user/edit/edit.component';
import { PointsComponent } from './components/brain/points/points.component';
import { NewComponent } from './components/brain/new/new.component';
import { PasswordComponent } from './components/user/password/password.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { ProfilePageComponent } from './pages/user/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent, pathMatch: 'full'},
  { path: 'login', component: LoginPageComponent},
  { path: 'register', component: RegisterPageComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'quizzes/statistics', component: StatisticsComponent},
  { path: 'quizzes', component: QuizzesComponent},
  { path: 'quizzes/new', component: NewComponent},
  { path: 'quizzes/new/game', component: GameComponent},
  { path: 'quizzes/new/game/points', component: PointsComponent},
  { path: 'profile/edit', component: EditComponent},
  { path: 'profile/edit/password', component: PasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
