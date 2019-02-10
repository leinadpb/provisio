import { Component, Input } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@Component({
    templateUrl: 'register.html'
})
export class RegisterPage {

    // Common user
    @Input() private name: string;
    @Input() private lastname: string;
    @Input() private email: string;
    @Input() private password: string;
    @Input() private isWatcher: boolean = true;

    // Provider user
    @Input() private logoUrl: string;
    @Input() private audioUrl: string;
    @Input() private videoUrl: string;
    @Input() private motto: string;
    @Input() private address: string;
    @Input() private phone: string;
    @Input() private category: string;
    @Input() private nameProvider: string;
    @Input() private website: string;

    @Input() private imgPreview: any;
    @Input() private showImgPreview: boolean = false;

    private isLoading: boolean = false;
    private loading: LoadingController;

    constructor(private navCtrl: NavController, private loadCtrl: LoadingController) {
        
    }

    private goToLoginPage(): void {
        this.navCtrl.push(LoginPage);
    }

    register(evetn: any) {
        this.loading = this.loadCtrl.create({content: 'Creating new user...'});
        this.loading.present();
        setTimeout(()  => {
            this.navCtrl.setRoot(TabsPage);
            this.loading.dismiss();
        }, 3000);
    }
}