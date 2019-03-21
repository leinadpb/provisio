import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateProductPage } from '../create-product/create-product';
import { SqlService } from '../../services/sql-service/SqlService';
import { UserInfoService } from '../../services/user-info';

@Component({
  templateUrl: 'addproduct.html',
})
export class AddproductPage {

  private productList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlService: SqlService, private userInfo: UserInfoService) { }

    ionViewWillEnter() {
      this.loadItems();
    }

  loadItems() {
    this.productList = [];
    console.log('Will load items...');
    this.sqlService.getProductsByEmail(this.userInfo.email).then(data => {
      this.productList = data;
      console.log('FETCHED PRODUCTS');
      console.log(this.productList);
    });
  }

  private deleteProduct(id: any) {
    this.sqlService.deleteProduct(id).then(() => {
      alert('Product was deleted!');
      this.loadItems();
    })
  }

  private viewCreateProductPage(): void {
      this.navCtrl.push(CreateProductPage);
  }

}
