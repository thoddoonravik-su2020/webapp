import { Component, OnInit ,ViewChild} from '@angular/core';
import { AuthenticationService, TokenPayload, BookDetails, CartItems } from '../authentication.service'
import { Router } from '@angular/router'
import { NgForm, NgModel } from '@angular/forms';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material';
import { ImageViewComponent } from '../imageView/imageView.component';
import { MatTable } from '@angular/material/table'


@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent {

  @ViewChild(MatTable) table: MatTable<any>;

  cart: CartItems ={
    id:0,
    userid:0,
    quantity:0,
    PRICE:0,
    title:'',
    bookid:0,
    message : ''
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
  datasource : any;
  displayedColumns: string[] = ['book id', 'book title', 'book quantity', 'book price','view Image','addToCart'];

  constructor(private auth: AuthenticationService, private router: Router,public dialog : MatDialog) {
    this.auth.profile().subscribe(x=>{
      this.bookDetails.userid = x.id;
      this.viewBookDetails();
    })
  }


  viewBookDetails(){

    this.auth.buyerBooks(this.bookDetails.userid).subscribe((res)=>{
      this.books =res as BookDetails[] ;
      this.datasource = this.books;
    });
  }


  addToCart(book:BookDetails){
    console.log('cart comp add to cart')
    this.auth.findInCart(this.bookDetails.userid,book.id).subscribe(x =>{
      if(x.length != 0){
          alert("Book already exists in cart. Please update in cart");
      }else{
        var quantity = prompt("Please enter quantity");
        var q: number = parseFloat(quantity);
        var q2 : number = parseInt(quantity);
        if(q-q2 != 0){
          alert("Enter a whole number value");
        }
     
        else if (!Number.isNaN(q) && q <= book.quantity && q > 0){
          let body = {
            "bookid" : book.id,
            "userid" : this.bookDetails.userid,
            "quantity" : q,
            "PRICE" : book.PRICE,
            "title" : book.title
          }
          console.log(body)
    
          this.auth.addToCart(body).subscribe( x =>{
            alert("Added to cart successfully");
          });
    
        }
        else{
          if(Number.isNaN(q)){
            alert("Please enter a valid quantity");
          }
          else if(q > book.quantity){
            alert("Please enter a lesser quantity. Available quantity is " + book.quantity);
          }
          else if(q <= 0){
              alert("Please enter a quantity greater than 0");
          }
        }
      }
    })
    
      
  }
  
  viewImages(id : any){
    this.auth.getImages(id).subscribe(imageArr => {
      let modalData = {
        imageContent : imageArr,
        userType: 'Buyer',
        bookId : id
      }

      const dialogRef = this.dialog.open(ImageViewComponent,{
        width: '50%', height: '80%',
        data: modalData
      });

    })
  }

  clicked(ele : any){
    console.log(ele)
  }




ngOnInit(){
  this.viewBookDetails();
    
}
}