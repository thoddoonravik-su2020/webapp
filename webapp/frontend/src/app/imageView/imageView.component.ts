import { Component,Inject } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './imageView.component.html',
    selector: 'image-view'
})
export class ImageViewComponent {

    images : any;
    userType : any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ImageViewComponent>) {
    console.log("inside imageview")
    console.log(data)
      this.images = data;
      this.userType = data.userType;
   }

   ngOnInit() : void{

   }

   deleteImage(x:any){
    console.log(x);
   }   

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }


}