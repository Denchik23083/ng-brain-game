import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { QuizzesComponent } from './components/brain/quizzes/quizzes.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from './components/user/profile/profile.component';
import { StatisticsComponent } from './components/user/statistics/statistics.component';
import { HeaderComponent } from './components/headers/header/header.component';
import { AuthHeaderComponent } from './components/headers/auth-header/auth-header.component';
import { ProfileHeaderComponent } from './components/headers/profile-header/profile-header.component';
import { GameComponent } from './components/brain/game/game.component';
import { BrainGameService } from './services/brain-game-service';
import { EditComponent } from './components/user/edit/edit.component';
import { PointsComponent } from './components/brain/points/points.component';
import { PasswordComponent } from './components/user/password/password.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthInterceptor } from './utils/auth.interceptor';
import { RefreshInterceptor } from './utils/refresh.interceptor';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegisterPageComponent } from './pages/auth/register-page/register-page.component';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { ProfilePageComponent } from './pages/user/profile-page/profile-page.component';
import { StatisticsHeaderComponent } from './components/headers/statistics-header/statistics-header.component';
import { QuizzesPageComponent } from './pages/brain/quizzes-page/quizzes-page.component';
import { AdminGodHeaderComponent } from './components/headers/admin-god-header/admin-god-header.component';
import { RemoveUserComponent } from './components/user/remove-user/remove-user.component';
import { RemoveUserPageComponent } from './pages/user/remove-user-page/remove-user-page.component';
import { UserToAdminPageComponent } from './pages/user/user-to-admin-page/user-to-admin-page.component';
import { AdminToUserPageComponent } from './pages/user/admin-to-user-page/admin-to-user-page.component';
import { UserToAdminComponent } from './components/user/user-to-admin/user-to-admin.component';
import { AdminToUserComponent } from './components/user/admin-to-user/admin-to-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    QuizzesComponent,
    MainComponent,
    LoginComponent,
    ProfileComponent,
    StatisticsComponent,
    HeaderComponent,
    AuthHeaderComponent,
    ProfileHeaderComponent,
    GameComponent,
    EditComponent,
    PointsComponent,
    PasswordComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainPageComponent,
    ProfilePageComponent,
    StatisticsHeaderComponent,
    QuizzesPageComponent,
    AdminGodHeaderComponent,
    RemoveUserPageComponent,
    RemoveUserComponent,
    UserToAdminPageComponent,
    AdminToUserPageComponent,
    UserToAdminComponent,
    AdminToUserComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    BrainGameService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
