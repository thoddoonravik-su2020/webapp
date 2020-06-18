import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload, BookDetails, CartItems } from '../authentication.service'
import { Router } from '@angular/router'
import { NgForm, NgModel } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent {



  cart: CartItems ={
    id:0,
    userid:0,
    quantity:0,
    price:0

  }

  bookDetails: BookDetails = {
    userid : "",
    id : "",
    isbn : "",
    title : "",
    authors : "",
    quantity : "",
    PRICE : ""

  };

  books : BookDetails[];
  carts : CartItems[];

  constructor(private auth: AuthenticationService, private router: Router) {
    this.auth.profile().subscribe(x=>{
      this.bookDetails.userid = x.id;
      this.viewBookDetails();
    })
  }


  viewBookDetails(){

    this.auth.buyerBooks(this.bookDetails.userid).subscribe((res)=>{
      this.books =res as BookDetails[] ;
    });
  }


  addToCart(id:any){
    console.log('cart comp add to cart')
    var quantity = prompt("Please enter quantity");

    if(quantity != null){
      let body = {
        "bookid" : id,
        "userid" : this.bookDetails.userid,
        "quantity" : quantity
      }
      console.log(body)

      this.auth.addToCart(body).subscribe();

    }

    
    
    // });
  }
  

// addToCart(y:any){
//   console.log('cart component')
 
//   let booktoAdd = this.books.find(x=> x.id == y);
//   console.log(booktoAdd);
//   this.auth.addToCart(booktoAdd).subscribe(x=>{                                                             
//   })
//    this.router.navigate(['/cart']);

// }




ngOnInit(){

    
}
}