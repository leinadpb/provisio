import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth-service';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentUser: string = '';
  private isLoggedIn: boolean = false;

  constructor(public navCtrl: NavController, private authService: AuthService) {
    this.currentUser = this.authService.getUserEmail();
    this.isLoggedIn = this.authService.isAuthenticated();
  }


	private goToProfilePage(): void {
	    this.navCtrl.push(ProfilePage);
	}

}
