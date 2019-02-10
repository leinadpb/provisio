import { Component, Input, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Subscription } from 'rxjs/Subscription';

import { SqliteDatabaseService } from '../services/sqlite-database-service';
import { AuthService } from '../services/auth-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{

  private rootPage: any = LoginPage;
  @Input() private isReady: boolean = false;
  private authStream: Subscription;

  constructor(platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen,
    private db: SqliteDatabaseService, private auth: AuthService) 
  {
    splashScreen.show();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      
      this.verifyPageToStart();

      this.isReady = true;
      this.splashScreen.hide();

    });
  }

  ngOnInit(): void {

    // Not being used until varifyPageToStart is ready!
    let authStream = this.auth.authenticationStream.subscribe(data => {
      if (data.loggedIn) {

          // Start app
          this.isReady = true;
          this.splashScreen.hide();

      }
    });
  }

  verifyPageToStart() {

    /// Not working yet.....

    // this.db.get('current-user-app').then(userEmail => {
      
    //   console.log('user stored email: ', userEmail);
      
    //   if (userEmail != undefined) {

    //     this.db.get(userEmail).then(password => {

    //       console.log('Password hash ', password);
          
    //       if (!!password) {
    //         this.auth.login(userEmail, password);
    //       }

    //     });
    //   }
    // });
  }
}
