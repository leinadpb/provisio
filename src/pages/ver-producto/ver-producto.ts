import { Component  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SqlService } from '../../services/sql-service/SqlService';
import { UserInfoService } from '../../services/user-info';

@Component({
  templateUrl: 'ver-producto.html',
})
export class VerProductoPage {

  private productList: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlService: SqlService, private userInfo: UserInfoService) { }

  ionViewWillEnter() {
    this.sqlService.getProductsByEmail(this.userInfo.email).then(data => {
      this.productList = data;
      console.log('FETCHED PRODUCTS');
      console.log(this.productList);
    });
  }
  
}
