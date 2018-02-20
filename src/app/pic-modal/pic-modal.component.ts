import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pic-modal',
  templateUrl: './pic-modal.component.html',
  styleUrls: ['./pic-modal.component.css']
})
export class PicModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PicModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
