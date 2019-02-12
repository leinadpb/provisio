import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Subscription } from 'rxjs';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import {App} from 'ionic-angular';

@Component({
    templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit, OnDestroy {

    private loggedOut: Subscription;

    constructor(private app: App, private auth: AuthService, public navCtrl: NavController) {}

    ngOnInit(): void {
        this.loggedOut = this.auth.authenticationStream.subscribe(data => {
            if (!data.loggedIn) {
                console.log('Im loged out now...');
                // this.nvCtrl.push(LoginPage);
                this.app.getRootNav().setRoot(LoginPage);
            }
        });

    }

    ngOnDestroy() {
        if (!!this.loggedOut) {
            this.loggedOut.unsubscribe();
        }
    }

    private logout(): void {
        this.auth.logout();
    }

    private goToVerProductoPage(): void {
        this.navCtrl.push(HomePage);
    }

}