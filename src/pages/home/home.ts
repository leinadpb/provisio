import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth-service';
import { DetailPage } from '../detail/detail';
import { ProfilePage } from '../profile/profile';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from '../../services/Firebase/FirebaseService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  itemList: any[] = [];
  originalData: any[] = this.itemList;
  
  currentUser: any;
  isLoggedIn: any;
  private providers: any[];

  constructor(public navCtrl: NavController, private authService: AuthService,
    private db: AngularFireDatabase, private firebase: FirebaseService) {
    this.currentUser = this.authService.getUserEmail();
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.firebase.readAllUsers().subscribe((data: any[]) => {
      console.log('DATA:');
      console.log(data);
      this.providers = data.filter(x => x.userType === 'PROVIDER');
      console.log(this.providers);
    });
  }

  ionViewWillEnter() {
    this.loadItemData();
  }

  loadItemData() {
    this.firebase.readAllUsers().subscribe((data: any[]) => {
      console.log('DATA:');
      console.log(data);
      this.itemList = data.filter(x => x.userType === 'PROVIDER');
      this.originalData = this.itemList;
      console.log(this.providers);
    });
  }

  private getItems(ev: any) {
    this.itemList = this.originalData;
      const val = ev.target.value;
      if (val && val.trim() != '') {
        this.itemList = this.itemList.filter((item) => {
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }   
  }

	private viewDetail(email: string): void {
	    this.navCtrl.push(DetailPage, {'email': email});
	}

}
