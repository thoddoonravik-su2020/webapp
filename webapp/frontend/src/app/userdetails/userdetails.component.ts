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
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  users : TokenPayload[];

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.profile().subscribe(
      user => {
        this.credentials = user
        // console.log('into constructor subscribe')
        // this.auth.updateUser(user).subscribe(X=>{alert('Successfully updated !!');})
      },
      err => {
        console.error(err)
      }
    )
  }


  userEdit(){       
         this.auth.updateUser(this.credentials).subscribe(X=>{alert('Successfully updated !!');})
  }
}
