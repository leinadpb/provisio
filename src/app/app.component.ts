import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Subscription } from 'rxjs/Subscription';

import { SqliteDatabaseService } from '../services/sqlite-database-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  private rootPage: any = LoginPage;
  private isReady: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, private splashScreen: SplashScreen,
    private db: SqliteDatabaseService) 
  {
    splashScreen.show();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      
      this.verifyPageToStart();
      
      splashScreen.hide();
    });
  }

  verifyPageToStart() {
    let userEmail = this.db.get('current-user-app');
    if (!!userEmail) {
      let isAuth = this.db.get(userEmail);
      if (isAuth) {
        this.rootPage = TabsPage;
      }
    }

    this.isReady = true;
  }
}
