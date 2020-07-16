import { Component } from "@angular/core";
import { AuthenticationService, TokenPayload } from "../authentication.service";
import { Router } from "@angular/router";
import { UserDetails } from 'src/authentication-service';

@Component({
  templateUrl: "./userdetails.component.html"
})
export class UserdetailsComponent {
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



  users : TokenPayload[];

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.profile().subscribe(
      user => {
        this.credentials = user

      },
      err => {
        console.error(err)
      }
    )
  }


  userEdit(){    
    this.cred={
      id: this.credentials.id,
      firstname: this.credentials.firstname,
      lastname: this.credentials.lastname,
      email: this.credentials.email,
      password: btoa(this.credentials.password)
    }
       
         this.auth.updateUser(this.cred).subscribe(X=>{alert('Successfully updated !!');})
  }
}
