import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload, BookDetails, Images } from '../authentication.service'
import { Router } from '@angular/router'
import { NgForm, NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ImageViewComponent } from '../imageView/imageView.component'


declare var M: any;
@Component({
  templateUrl: './book.component.html'
})
export class BookComponent {

  bookDetails: BookDetails = {
   id:0,
  userid:0, 
	isbn:'',
	title:'',
	authors:'',
	quantity:0,
  PRICE:0
  }

  editBook: BookDetails = {
    id:0,
   userid:0, 
   isbn:'',
   title:'',
   authors:'',
   quantity:0,
   PRICE:0
   }


  imageDetails: Images = {
    id: 0,
    bookid : 0,
    imagedata: ''

  }

  books : BookDetails[] = [];
  imageData : Images[]=[];
  btnAdd : boolean = false;
  btnUpdate : boolean = true;

  constructor(private auth: AuthenticationService, private router: Router,public dialog: MatDialog) {
   
    console.log(this.bookDetails);
    this.auth.profile().subscribe(x=>{      
      this.bookDetails.userid = x.id
      this.viewBookDetails();
    })
  }

  

  seller() {
    this.auth.seller(this.bookDetails,this.images).subscribe(x=>{
      alert("added")
      this.viewBookDetails();  
      this.bookDetails = {
        id:0,
        userid:0, 
	      isbn:'',
	      title:'',
	      authors:'',
	      quantity:0,
        PRICE:0
      }                                                      
    });
}

  viewImage(x : any){
    console.log(x);
    this.auth.getImages(x.id).subscribe(y =>{
      let modalData = {
        imageContent : y,
        userType : 'Seller',
        bookId : x.id
      }

      const dialogRef = this.dialog.open(ImageViewComponent,{
        width: '50%', height: '80%',
        data: modalData
      });

      dialogRef.afterClosed().subscribe((result : Images)=>{
          
      })

    })

  }

  onEdit(book: BookDetails){
    this.editBook = {
      id : book.id,
      userid:book.userid, 
      isbn:book.isbn,
      title:book.title,
      authors:book.authors,
      quantity:book.quantity,
      PRICE:book.PRICE
    }
    this.bookDetails = this.editBook;
    this.btnUpdate = false;
    this.btnAdd = true;   
  }

  viewBookDetails(){
    this.auth.getBookDetails(this.bookDetails.userid).subscribe((res)=>{           
      this.books =res as BookDetails[] ;      
      
    });
  }

  onDelete(book: BookDetails){
    console.log('in book.comp ondelete')
    if(confirm('Are you sure to delete the book?')==true){
      this.auth.deleteBook(book.id).subscribe(x =>{
        this.viewBookDetails();     
      });      
      
    }
  }

  ngOnInit(){    
  }

  resetForm(form?: NgForm){
    this.auth.putBookDetails(this.bookDetails,this.images).subscribe(X=>{alert('Successfully updated !!');
    this.viewBookDetails();
    this.bookDetails = {
      id:0,
      userid:0, 
      isbn:'',
      title:'',
      authors:'',
      quantity:0,
      PRICE:0
    }  
    this.btnAdd = false;
    this.btnUpdate = true;
  });
    }

    url="";
    
  

    images = [];
    
    myFunction(event){
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
              var reader = new FileReader();
 
              reader.onload = (event:any) => {
                console.log("blob:" + event.target.result);
                 this.images.push(event.target.result); 
              }
              reader.readAsDataURL(event.target.files[i]);
      }

    }

}
}