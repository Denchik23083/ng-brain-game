import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/brain/game/game.component';
import { LoginComponent } from './components/auth/login/login.component';
import { QuizzesComponent } from './components/brain/quizzes/quizzes.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { EditComponent } from './components/user/edit/edit.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { MainComponent } from './components/main/main.component';
import { PointsComponent } from './components/brain/points/points.component';
import { NewComponent } from './components/brain/new/new.component';
import { PasswordComponent } from './components/user/password/password.component';
import { AuthPageComponent } from './pages/auth/auth-page/auth-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent},
  { path: 'main', component: MainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'main/profile', component: ProfileComponent},
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
