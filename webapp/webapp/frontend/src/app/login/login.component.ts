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
}
