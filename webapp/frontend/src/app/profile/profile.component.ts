import { Component } from '@angular/core'
import { AuthenticationService, UserDetails } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails

  constructor(private auth: AuthenticationService, private route: Router) {}

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }

  profile(){
    this.route.navigate(['userDetails'])
  }
  
}