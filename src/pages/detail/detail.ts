import { Component, OnInit, Input } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { LoadingController, Loading } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { FilePath } from '@ionic-native/file-path';
import { StreamingMedia, StreamingAudioOptions, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { HomePage } from '../home/home';
import { NavController, NavParams } from 'ionic-angular';
import { UserInfoService } from '../../services/user-info/UserInfoService';
import { FirebaseService } from '../../services/Firebase/FirebaseService';
@Component({
  templateUrl: 'detail.html',
})
export class DetailPage implements OnInit {

  private audioSelected: boolean = false;
  private starSelected: boolean = false;
  @Input() private watchers: number = 0;

  private selectedProviderEmail: string;
  private provider: any = {};
  private providerWatchers: any[] = [];

  private currentUserIsWatchingViewingProvider: boolean = false;

  private loading: Loading;

  private options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: (e) => { console.log('Error streaming') },
    orientation: 'landscape',
    controls: true
  };

  private fetchingProviderInfo: Loading = this.loadCtrl.create({
    content: 'Obteniendo informacion del proveedor...'
  });

  private optionsAudio: StreamingAudioOptions = {
    bgColor: "#FFFFFF",
    bgImage: "http://pluspng.com/img-png/nestle-logo-vector-png-posted-605.jpg",
    bgImageScale: "fit", // other valid values: "stretch", "aspectStretch"
    initFullscreen: false, // true is default. iOS only.
    keepAwake: false, // prevents device from sleeping. true is default. Android only.
    successCallback: function() {
      console.log("Player closed without error.");
    },
    errorCallback: function(errMsg) {
      console.log("Error! " + errMsg);
    }
  };

  constructor(private youtube: YoutubeVideoPlayer, private loadCtrl: LoadingController,
    private audioPlayer: NativeAudio, private nativePath: FilePath,
    private streaming: StreamingMedia, public navCtrl: NavController,
    private userInfo: UserInfoService, private navParams: NavParams,
    private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.selectedProviderEmail = this.navParams.get('email');
    this.getInfo(this.selectedProviderEmail);

    this.loading = this.loadCtrl.create({
      content: 'Cargando video...'
    });
  }

  getInfo(email: string, withoutLoading: boolean = false) {
    
    if(!withoutLoading) this.fetchingProviderInfo.present();

    this.updateUser(email);
    
    if(!withoutLoading) this.fetchingProviderInfo.dismiss();
  }

  updateUser(email: string) {
    this.firebase.readAllUsers().subscribe((data: any[]) => {
      this.provider = data.filter(x => x.userType === 'PROVIDER' && x.email === email)[0];
      console.log('Provider fetched: ');
      console.log(this.provider);
      this.providerWatchers = (!!this.provider.watchers)? this.provider.watchers: [];
      if (this.providerWatchers.length > 0) {
        this.ifCurrentUserIsWatchingViewingProvider(this.providerWatchers);
      } else {
        this.currentUserIsWatchingViewingProvider = false;
      }
    });
  }

  ifCurrentUserIsWatchingViewingProvider(watchers: any[]) {
    console.log('Before verifying if current user is watchnig provider....');
    console.log(watchers);
    console.log(this.userInfo.email);
    let value = watchers.filter(x => x === this.userInfo.email)[0];
    console.log(value);
    if (!!value) this.currentUserIsWatchingViewingProvider = true;
    else this.currentUserIsWatchingViewingProvider = false;
  }

  private toggleAudio(): void {
    alert('Play audio');
    // this.audioPlayer.play('uniqueId1');
    this.streaming.playAudio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', this.optionsAudio);
  }

  private toggleVideo(): void {
    // this.openVideo('1i6c3HNiYNw&t=46s'); --- It's working
    this.streaming.playVideo('https://app.coverr.co/s3/mp4/Road-candies.mp4', this.options);
  }

  private openVideo(videoId: string): void {
    // Playing a video.
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
      this.youtube.openVideo(videoId);
    }, 2000);
  }

  private startWatching(): void {
    // Get watcher email
    let watcherEmail = this.userInfo.email;
    // Get viewing provider email
    let providerEmail = this.provider.email;
    // Add provider email to array of "Watchers" of current user in firebase DB.
    this.firebase.addProviderToUserWatchersList(watcherEmail, providerEmail, this.userInfo.docId, this.provider.docId);

    this.updateUser(providerEmail);
  }

  private stopWatching(): void {
    // Get watcher email
    let watcherEmail = this.userInfo.email;
     // Get viewing provider email
     let providerEmail = this.provider.email;
     // Add provider email to array of "Watchers" of current user in firebase DB.
     this.firebase.removeProviderFromUserWatchersList(watcherEmail, providerEmail, this.userInfo.docId, this.provider.docId);

     this.currentUserIsWatchingViewingProvider = false;
     this.updateUser(providerEmail);
  }

  private verProductosSimilares(): void {
      this.navCtrl.push(HomePage);
  }
}
