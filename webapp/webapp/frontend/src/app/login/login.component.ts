import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }

  cred: TokenPayload = {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };


  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {

      this.cred={
        id: this.credentials.id,
        firstname: this.credentials.firstname,
        lastname: this.credentials.lastname,
        email: this.credentials.email,
        password: btoa(this.credentials.password)
      }
    this.auth.login(this.cred).subscribe(
      () => {
        this.router.navigateByUrl('/profile')
      },
      err => {
        alert("Username or Password Incorrect")
      }
    )
  }

  resetPassword(){
    var  em : string = this.credentials.email;
    if(this.credentials.email == null || this.credentials.email == '' || em.length < 3){
      alert("Please provide a valid email");
    }else{
      // Code to trigger email
      this.auth.reset(em).subscribe(x=>{
        alert("Mail has been sent to " + this.credentials.email + ". Please find the reset instructions in the mail"); 
      })
    
    }
  }


}
