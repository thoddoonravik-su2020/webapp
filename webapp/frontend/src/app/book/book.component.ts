import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload, BookDetails } from '../authentication.service'
import { Router } from '@angular/router'
import { NgForm, NgModel } from '@angular/forms';

declare var M: any;
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

  books : BookDetails[];

  constructor(private auth: AuthenticationService, private router: Router) {
    this.viewBookDetails();
    this.auth.profile().subscribe(x=>{
      this.bookDetails.userid = x.id
    })
  }

  // seller() {
  //   console.log(this.bookDetails)
  // }

  

  seller(form: NgForm) {

    this.auth.seller(this.bookDetails).subscribe();
    this.viewBookDetails();                                                             
}

  onEdit(book: BookDetails){
    this.bookDetails =book;
   
  }

  viewBookDetails(){
    this.auth.getBookDetails().subscribe((res)=>{
      this.books =res as BookDetails[];
      
    });
  }

  OnDelete(_id:string, form:NgForm){
    if(confirm('Are you sure to delete the book?')==true){
      this.auth.deleteBook(_id).subscribe();
      this.viewBookDetails;
      M.toast({html: 'Deleted Successfully !! ', classes: 'rounded'})
    }
  }

  ngOnInit(){
    this.resetForm()
    
  }
  resetForm(form?: NgForm){
    console.log("a")
    }


}