import { Component,Inject } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from '../authentication.service'
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
    templateUrl: './imageView.component.html',
    selector: 'image-view'
})
export class ImageViewComponent {

    images : any;
    userType : any;
    bookId : any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ImageViewComponent>,private auth: AuthenticationService) {
    console.log("Image view ")
    console.log( data)
      this.images = data.imageContent;
      this.userType = data.userType;
      this.bookId = data.bookId;
   }

   ngOnInit() : void{

   }

   deleteImage(x:any){
    console.log(x);
    this.auth.deleteBookImage(x).subscribe(y =>{
      alert("Image deleted successfully")
      this.auth.getImages(this.bookId).subscribe(img =>{
        this.images = img;
      })
    })
   }   

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }


}