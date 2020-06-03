import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import {MatIconModule} from '@angular/material/icon'


import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
import { BookComponent} from './book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seller', component: BookComponent },
  
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
