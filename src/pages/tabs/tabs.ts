import { AddproductPage } from './../addproduct/addproduct';
import { Component, OnInit, Input } from '@angular/core';
import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { ConfigService } from '../../services/config-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = ProfilePage;
  tab2Root = HomePage;
  tab3Root = AboutPage;
  tab4Root = AddproductPage;

  @Input() private homeTitle: string;
  @Input() private aboutTitle: string;
  @Input() private profileTitle: string;
  @Input() private addproductTitle: string;

  constructor(private configs: ConfigService) {

  }

  ngOnInit(): void {
    this.configs.getJSON().subscribe(data => {
      this.homeTitle = data['APP_NAME'];
      this.aboutTitle = data['APP_NAME'];
      this.profileTitle = data['APP_NAME'];
      this.addproductTitle = data ['APP_NAME'];
        });
  }
}
