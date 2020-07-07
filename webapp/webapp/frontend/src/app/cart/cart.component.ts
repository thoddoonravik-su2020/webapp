import { Component} from '@angular/core';
import { AuthenticationService, TokenPayload, BookDetails,CartItems } from '../authentication.service'
import { Router } from '@angular/router'
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{ 

  cart: CartItems ={
    id:0,
    userid:0,
    quantity:0,
    PRICE:0,
    title:'',
    bookid:0,
    message: ''
  }

bookDetails: BookDetails = {
  id:0,
 userid:0, 
 isbn:'',
 title:'',
 authors:'',
 quantity:0,
 PRICE:0
 }
 
 carts : CartItems[];
 cartDetails : CartItems[] = [];
 message : string = '';

 viewCartDetails(){
  this.auth.cart(this.userid).subscribe((res)=>{
    this.carts =res as CartItems[] ;
    this.cartDetails=[]
    this.carts.forEach(c =>{
      this.auth.getBook(c.bookid).subscribe(res =>{
        if(res == null){
          c.message = "Book is no longer available"
        }
        else if(res.quantity == 0){
          c.message = "Book Out of Stock"
        }
        this.cartDetails.push(c);
      })
    })
    this.carts = this.cartDetails;
    
  });
}

onEdit(cart : CartItems){
  var quantity = prompt("Please enter quantity");
    var q: number = +quantity;
   this.auth.getBook(cart.bookid).subscribe(res =>{
     this.bookDetails = res;     
     
     if (!Number.isNaN(q) && q <= this.bookDetails.quantity && q > 0){
      let cartD : CartItems = {
          id: cart.id,
          userid: cart.userid,
          quantity: q,
          PRICE: cart.PRICE,
          title: cart.title,
          bookid: cart.bookid,
          message: cart.message
      };
      this.auth.updateCart(cartD).subscribe( x =>{
        alert("Cart Updated Successfully");
        this.viewCartDetails();
      });

    }
    else{
      if(Number.isNaN(q)){
        alert("Please enter a valid quantity");
      }
      else if(q > this.bookDetails.quantity){
        alert("Please enter a lesser quantity. Available quantity is " + this.bookDetails.quantity);
      }
      else if(q <= 0){
          alert("Please enter a quantity greater than 0");
      }
    }
   })
}

onDelete(cart : CartItems){
  this.auth.deleteCart(cart.id).subscribe(x =>{
    alert("Item deleted successfully")
    this.viewCartDetails();
  })
}


  userid : any;

  constructor(private auth: AuthenticationService, private router: Router) { }
  ngOnInit() {
    this.auth.profile().subscribe(x=>{
      this.userid = x.id
      this.viewCartDetails();
    })
  
  }


}