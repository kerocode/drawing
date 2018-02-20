import { NgModule } from '@angular/core';
import { MatCardModule, MatSliderModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatGridListModule } from '@angular/material';


@NgModule({
  imports: [
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
  ],
  exports: [
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
  ]
})
export class MaterialModule { }
