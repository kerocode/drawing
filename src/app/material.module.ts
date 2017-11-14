import { NgModule } from '@angular/core';
import { MatCardModule, MatSliderModule, MatToolbarModule } from '@angular/material';


@NgModule({
  imports: [
    MatCardModule,
    MatSliderModule,
    MatToolbarModule
  ],
  exports: [
    MatCardModule,
    MatSliderModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
