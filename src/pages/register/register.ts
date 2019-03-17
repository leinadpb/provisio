import { Component, Input, OnInit } from '@angular/core';
import { NavController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth-service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Subscription } from 'rxjs';
import { UploadFileService } from '../../services/upload-file';
import { UserInfoService } from '../../services/user-info';
import { FirebaseService } from '../../services/Firebase/FirebaseService';
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

    private uploadedImageUrl: any;

    private registered: Subscription;

    private isLoading: boolean = false;
    
    private creatingWatcherLoading: Loading;
    private creatingProviderLoading: Loading;

    @Input() private errorUserExists: boolean = false;
    @Input() private hasErrors: boolean = false;

    private users$: AngularFireList<any[]>;

    // upload
    @Input() private progress: number = 0;
    private uploadInfo: any;

    private disabledCreate: boolean = false;
    private imageHasBeenUploaded: boolean = false;

    constructor(private navCtrl: NavController, private loadCtrl: LoadingController,
        private authService: AuthService, private db: AngularFireDatabase,
        private uploadService: UploadFileService, private fireService: FirebaseService,
        private userInfo: UserInfoService, private toastCtrl: ToastController) {
        
    }

    ngOnInit() {

        this.creatingProviderLoading = this.loadCtrl.create({content: 'Creating new provider user...'});
        this.creatingWatcherLoading = this.loadCtrl.create({content: 'Creating new watcher user...'});

        this.registered = this.authService.registerStream.subscribe(data => {
            if (data.success) {
                this.errorUserExists = false;
                this.navCtrl.setRoot(TabsPage);
                if (!!this.creatingProviderLoading) this.creatingProviderLoading.dismiss();
                if (!!this.creatingWatcherLoading) this.creatingWatcherLoading.dismiss();
            } else {
                this.errorUserExists = true;
                if (!!this.creatingProviderLoading) this.creatingProviderLoading.dismiss();
                if (!!this.creatingWatcherLoading) this.creatingWatcherLoading.dismiss();
            }
        });

        this.uploadService.fileStream.subscribe(data => {
            if (data.success) {
                this.uploadInfo = data.uploadInfo;
                this.disabledCreate = false;
            }
            this.imageHasBeenUploaded = true;
        });

        this.uploadService.progressStream.subscribe(data => {
            //alert(data);
            this.progress = data.value;
        })
        this.users$ = this.db.list('/users');
    }

    presentImageProfileIsNeededToast() {
        const toast = this.toastCtrl.create({
            message: 'Please, select a logo image from your cellphone.',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
        });
        toast.present();
    }

    pushNewUser(data: any): any {
        this.uploadService.getDownloadUrl(data.metadata.fullPath)
        .then(downloadUrl => {
            console.log('DOWNLOAD URL ------ ');
            console.log(downloadUrl);
            if (this.isWatcher) {
                let user: any = {
                    docId: '',
                    name: this.name,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    profileImageUrl: downloadUrl,
                    userType: "WATCHER",
                    watchers: []
                }
                let addedKey = this.users$.push(user).key;
                this.setPushedObjectKey(addedKey);
                this.authService.register(user, addedKey);
                this.userInfo.addWatcher(user, addedKey);
            }else {
                let user: any = {
                    docId: '',
                    name: this.nameProvider,
                    email: this.email,
                    password: this.password,
                    watchers: [],
                    profileImageUrl: downloadUrl,
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
                let addedKey = this.users$.push(user).key;
                this.setPushedObjectKey(addedKey);
                this.authService.register(user, addedKey);
                this.userInfo.addProvider(user, addedKey);
            }
        }, err => {console.log(err)});
    }
    setPushedObjectKey(addedKey: string): any {
        this.db.object(`/users/${addedKey}`).update({
            docId: addedKey
        });
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
            
                this.creatingWatcherLoading.present();
                let user: any = {
                    docId: '',
                    name: this.name,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password,
                    profileImageUrl: 'https://www.sherwoodchamber.net/media/com_jbusinessdirectory/pictures/companies/0/profileicon-1489087706.png',
                    userType: "WATCHER",
                    watchers: []
                }
                let addedKey = this.users$.push(user).key;
                this.setPushedObjectKey(addedKey);
                this.authService.register(user, addedKey);
                this.userInfo.addWatcher(user, addedKey);
            } else {
                console.log('Form not valid');
            }
        } else {

            if (!!this.nameProvider && !!this.email && !!this.password && !!this.address
                && !!this.phone && this.category /*&& this.logoUrl*/) {

                this.creatingProviderLoading.present();

                if (this.imageHasBeenUploaded) {
                    this.pushNewUser(this.uploadInfo);
                }

            }else {
                console.log('Form not valid');
            }

        }
    }
}