import { NgModule } from '@angular/core';
import { MatCardModule, MatSliderModule, MatToolbarModule, MatButtonModule } from '@angular/material';


@NgModule({
  imports: [
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class MaterialModule { }
