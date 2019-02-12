import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateProductPage } from '../create-product/create-product';

/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

  private viewCreateProductPage(): void {
      this.navCtrl.push(CreateProductPage);
  }

}
