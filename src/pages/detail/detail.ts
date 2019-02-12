import { Component, OnInit, Input } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { LoadingController, Loading } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { FilePath } from '@ionic-native/file-path';
import { StreamingMedia, StreamingAudioOptions, StreamingVideoOptions } from '@ionic-native/streaming-media';

@Component({
  templateUrl: 'detail.html',
})
export class DetailPage implements OnInit {

  private audioSelected: boolean = false;
  private starSelected: boolean = false;
  @Input() private watchers: number = 0;

  private loading: Loading;

  private options: StreamingVideoOptions = {
    successCallback: () => { console.log('Video played') },
    errorCallback: (e) => { console.log('Error streaming') },
    orientation: 'landscape',
    controls: true
  };

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
    private streaming: StreamingMedia) { }

  ngOnInit(): void {
    // this.nativePath.resolveNativePath('../../assets/audio/provisio-sample.mp3')
    //   .then(filePath => {
    //     this.audioPlayer.preloadSimple('uniqueId1', filePath);
    //   })
    //   .catch(err => console.log(err));


    this.loading = this.loadCtrl.create({
      content: 'Cargando video...'
    });
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

  private toggleWatch(): void {
    this.watchers = this.watchers + 1;
  }
}
