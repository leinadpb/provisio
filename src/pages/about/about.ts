import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth-service/AuthService';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit{

  private text: string;

  constructor(public navCtrl: NavController, private authService: AuthService) {

  }

  ngOnInit(): void {
    if (this.text === undefined)
    { 
      // this.text = this.authService.testService(); 
    }
  }


}
