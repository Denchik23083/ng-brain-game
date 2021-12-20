import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MainComponent } from './components/utilities/main/main.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { QuizzesComponent } from './components/brain/quizzes/quizzes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './components/auth/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/user/profile/profile.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { HeaderComponent } from './components/utilities/header/header.component';
import { GameComponent } from './components/brain/game/game.component';
import { BrainGameService } from './services/brain-game-service';
import { EditComponent } from './components/user/edit/edit.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { PointsComponent } from './components/brain/points/points.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    QuizzesComponent,
    AuthComponent,
    MainComponent,
    LoginComponent,
    ProfileComponent,
    StatisticsComponent,
    HeaderComponent,
    GameComponent,
    EditComponent,
    DeleteComponent,
    PointsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [BrainGameService, GameComponent, ProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
