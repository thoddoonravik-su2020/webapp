import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import {MatIconModule} from '@angular/material'
import { MatDialogModule,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog'

import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { HomeComponent } from './home/home.component'
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
import { BookComponent} from './book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {UserdetailsComponent} from './userdetails/userdetails.component';
import { BuyerComponent } from './buyer/buyer.component';
import { CartComponent } from './cart/cart.component'
import { ImageViewComponent } from './imageView/imageView.component'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule,MatTable} from '@angular/material/table';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seller', component: BookComponent },
  {path: 'userDetails', component: UserdetailsComponent},
  {path: 'buyer', component: BuyerComponent},
  {path: 'cart', component: CartComponent},
  
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
    BookComponent,
    UserdetailsComponent,
    BuyerComponent,
    CartComponent,
    ImageViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatTableModule
  ],
  entryComponents:[
    ImageViewComponent
  ],
  providers: [AuthenticationService, AuthGuardService,{
    provide: MatDialogRef,
    useValue: {}
    },
    {provide:MAT_DIALOG_DATA,useValue:{}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
