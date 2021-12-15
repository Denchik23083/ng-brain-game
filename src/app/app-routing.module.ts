import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth/auth.component';
import { GameComponent } from './components/brain/game/game.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainComponent } from './components/brain/main/main.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { EditComponent } from './components/user/edit/edit.component';
import { DeleteComponent } from './components/user/delete/delete.component';

const routes: Routes = [
  { path: '', component: AuthComponent},
  { path: 'main', component: MainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'main/profile', component: ProfileComponent},
  { path: 'main/statistics', component: StatisticsComponent},
  { path: 'main/game', component: GameComponent},
  { path: 'main/profile/edit', component: EditComponent},
  { path: 'main/profile/delete', component: DeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
