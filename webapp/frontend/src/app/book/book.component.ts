import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload, BookDetails } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './book.component.html'
})
export class BookComponent {
  bookDetails: BookDetails = {
    userid:0,
	isbn:'',
	title:'',
	authors:'',
	quantity:0,
	price:0
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  seller() {
   
        this.router.navigateByUrl("/book");
     
  }

  resetForm(form?: NgForm){
    
  }
}