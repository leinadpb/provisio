import { Component, OnInit, Input } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

import { ConfigService } from '../../services/config-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ProfilePage;

  @Input() private homeTitle: string;
  @Input() private aboutTitle: string;
  @Input() private contactTitle: string;
  @Input() private profileTitle: string;

  constructor(private configs: ConfigService) {

  }

  ngOnInit(): void {
    this.configs.getJSON().subscribe(data => {
      this.homeTitle = data['APP_NAME'];
      this.aboutTitle = data['APP_NAME'];
      this.contactTitle = data['APP_NAME'];
    });
  }
}
