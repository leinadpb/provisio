import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddproductPage } from '../addproduct/addproduct';
import { SqlService } from '../../services/sql-service/SqlService';
import { UserInfoService } from '../../services/user-info/UserInfoService';

@Component({
  selector: 'page-create-product',
  templateUrl: 'create-product.html',
})
export class CreateProductPage {

  private name: string = '';
  private description: string = '';
  private category: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlService: SqlService, private userInfo: UserInfoService) {
  }

  saveProduct() {
    this.sqlService.addProduct(this.name, this.description, 
      'https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg',
      this.userInfo.email).then((data) => {
        alert('Product saved!');
        console.log(data);
        this.name = '';
        this.description = '';
        this.category = '';
      });
  }

  private viewAddProductPage(): void {
      this.navCtrl.push(AddproductPage);
  }
}
