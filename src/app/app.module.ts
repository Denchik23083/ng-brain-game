import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/utilities/main/main.component';
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
import { QuizzesComponent } from './components/brain/quizzes/quizzes.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    MainComponent,
    AuthComponent,
    LoginComponent,
    ProfileComponent,
    StatisticsComponent,
    HeaderComponent,
    GameComponent,
    QuizzesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [BrainGameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
