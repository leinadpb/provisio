import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';


// Pages
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';
import { AddproductPage } from '../pages/addproduct/addproduct';
import { DetailPage } from '../pages/detail/detail';
import { VerProductoPage } from '../pages/ver-producto/ver-producto';
import { CreateProductPage } from '../pages/create-product/create-product';

// Components
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Services
import { AuthService } from '../services/auth-service';
import { SqliteDatabaseService } from '../services/sqlite-database-service';
import { ConfigService } from '../services/config-service';
import { FirebaseService } from '../services/Firebase/FirebaseService';
import { UploadFileService } from '../services/upload-file/UploadFileService';
import { UserInfoService } from '../services/user-info/UserInfoService';

// Plugins
import { IonicStorageModule } from '@ionic/storage';
import { NativeAudio } from '@ionic-native/native-audio';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { FilePath } from '@ionic-native/file-path';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { ImagePicker } from '@ionic-native/image-picker';

// Firebase
import { AngularFireModule, FirebaseDatabase } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { firebaseConfig } from '../services/Firebase/FirebaseConfig';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    AddproductPage,
    DetailPage,
    VerProductoPage,
    CreateProductPage,
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
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    DetailPage,
    AddproductPage,
    VerProductoPage,
    CreateProductPage,
  ],
  providers: [
    // Ours
    ConfigService,
    AuthService,
    SqliteDatabaseService,
    FirebaseService,
    UploadFileService,
    UserInfoService,

    // Ionic
    StatusBar,
    SplashScreen,
    LoadingController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    // Plugin
    SQLite,
    SQLitePorter,
    YoutubeVideoPlayer,
    NativeAudio,
    FilePath,
    StreamingMedia,
    Camera,
    File,
    ImagePicker,

    // Firebase
    AngularFireAuth,
    AngularFireDatabase,
  ]
})
export class AppModule {}
