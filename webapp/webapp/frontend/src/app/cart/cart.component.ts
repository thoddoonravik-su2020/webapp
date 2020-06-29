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
    price:0

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

 viewCartDetails(){
  this.auth.cart(this.userid).subscribe((res)=>{
    this.carts =res as CartItems[] ;
  });
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
