import { Component, Input, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';

import { FirebaseDatabase } from 'angularfire2';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth-service';
import { Watcher, Provider, Product } from '../../services/models';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FirebaseService } from '../../services/Firebase/FirebaseService';
import { UploadFileService } from '../../services/upload-file';
import { UserInfoService } from '../../services/user-info';

@Component({
    templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {

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

    private registered: Subscription;

    private isLoading: boolean = false;
    private loading: Loading;

    @Input() private errorUserExists: boolean = false;
    @Input() private hasErrors: boolean = false;

    private users$: AngularFireList<any[]>;

    // upload
    @Input() private progress: number = 0;
    private uploadInfo: any;

    private disabledCreate: boolean = false;

    constructor(private navCtrl: NavController, private loadCtrl: LoadingController,
        private authService: AuthService, private db: AngularFireDatabase,
        private fireService: FirebaseService, private uploadService: UploadFileService,
        private userInfo: UserInfoService) {
        
    }

    ngOnInit() {
        this.registered = this.authService.registerStream.subscribe(data => {
            if (data.success) {
                this.errorUserExists = false;
                this.navCtrl.setRoot(TabsPage);
                this.loading.dismiss();
            } else {
                this.errorUserExists = true;
                if (!!this.loading) {
                    this.loading.dismiss();
                }
            }
        });

        this.uploadService.fileStream.subscribe(data => {
            if (data.success) {
                this.uploadInfo = data.uploadInfo;
                this.disabledCreate = false;
            }
        });

        this.uploadService.progressStream.subscribe(data => {
            //alert(data);
            this.progress = data.value;
        })
        this.users$ = this.db.list('/users');
    }

    private goToLoginPage(): void {
        this.navCtrl.push(LoginPage);
    }

    private async selectLogo() {
        this.disabledCreate = true;
        await this.uploadService.pickImage();
    }

    private async registerUser() {

        if (this.isWatcher) {
            if (!!this.name && !!this.email && !!this.lastname && !!this.password) {
            
                this.loading = this.loadCtrl.create({content: 'Creating new watcher...'});
                this.loading.present();
    
                let user: any = {
                    name: this.name,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    watchers: [],
                    profileImageUrl: "",
                    userType: "WATCHER"
                }
                this.users$.push(user);
                this.authService.register(user);

                this.userInfo.addWatcher(user);

            } else {
                console.log('Form not valid');
            }
        } else {

            if (!!this.nameProvider && !!this.email && !!this.password && !!this.address
                && !!this.phone && this.category /*&& this.logoUrl*/) {

                this.loading = this.loadCtrl.create({content: 'Creating new provider...'});
                this.loading.present();

                let user: any = {
                    name: this.nameProvider,
                    email: this.email,
                    password: this.password,
                    watchers: [],
                    profileImageUrl: "",
                    userType: "PROVIDER",
                    videoUrl: !!this.videoUrl? this.videoUrl : "",
                    audioUrl: !!this.audioUrl? this.audioUrl : "",
                    motto: !!this.motto? this.motto : "",
                    address: this.address,
                    phone: this.phone,
                    category: this.category,
                    website: !!this.website? this.website : "",
                    logoUrl: !!this.logoUrl? this.logoUrl : ""
                }
                this.users$.push(user);
                this.authService.register(user);

                this.userInfo.addProvider(user);

            }else {
                console.log('Form not valid');
            }

        }
    }
}