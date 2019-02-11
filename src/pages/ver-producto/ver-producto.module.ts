import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerProductoPage } from './ver-producto';

@NgModule({
  declarations: [
    VerProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(VerProductoPage),
  ],
})
export class VerProductoPageModule {}
