import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { DetailPage } from '../pages/detail/detail';


// Components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Services
import { AuthService } from '../services/auth-service';
import { SqliteDatabaseService } from '../services/sqlite-database-service';
import { ConfigService } from '../services/config-service';
import { FirebaseService } from '../services/Firebase/FirebaseService';

// Plugins
import { IonicStorageModule } from '@ionic/storage';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../services/Firebase/FirebaseConfig';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    // Plugin
    IonicStorageModule.forRoot(),
    // Firebase
    AngularFireModule.initializeApp(firebaseConfig.fire)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    DetailPage
  ],
  providers: [
    // Ours
    ConfigService,
    AuthService,
    SqliteDatabaseService,
    FirebaseService,

    // Ionic
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    // Plugin
    IonicStorageModule,

    // Firebase
    AngularFireAuth
  ]
})
export class AppModule {}
