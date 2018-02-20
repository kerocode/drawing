import { NgModule } from '@angular/core';
import { MatCardModule, MatSliderModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatGridListModule, MatDialogModule, MatDividerModule } from '@angular/material';


@NgModule({
  imports: [
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    MatDividerModule
  ],
  exports: [
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
