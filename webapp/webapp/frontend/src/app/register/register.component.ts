import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  credentials: TokenPayload = {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };
  cred: TokenPayload = {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };


  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.cred={
      id: this.credentials.id,
      firstname: this.credentials.firstname,
      lastname: this.credentials.lastname,
      email: this.credentials.email,
      password: btoa(this.credentials.password)
    }
    
  
    this.auth.register(this.cred).subscribe(
      () => {
        this.router.navigateByUrl("/login");
      },
      err => {
        console.error(err);
      }
    );
  }
}