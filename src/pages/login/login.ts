import { Input, Component, Output, OnDestroy, EventEmitter, OnInit, ErrorHandler, ViewChild} from "@angular/core";
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth-service';
import { Subscription } from "rxjs";
import { NgForm } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { FirebaseService } from "../../services/Firebase/FirebaseService";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserInfoService } from "../../services/user-info";

@Component({
    templateUrl: 'login.html',
})
export class LoginPage implements OnInit, ErrorHandler, OnDestroy {

    @Input() private username: string;
    @Input() private password: string;
    private authenticated: Subscription;
    private isLoading: boolean;
    private loginError: boolean = false;
    private formNotValid: boolean = false;

    private loading: Loading;

    private users$: AngularFireList<any[]>;

    private registeredUsers: Array<any>;

    @ViewChild(NgForm) private form: NgForm;

    @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();

    constructor (private navCtrl: NavController, private authService: AuthService,
        private loadCtrl: LoadingController, private fireService: FirebaseService,
        private db: AngularFireDatabase, private userInfo: UserInfoService) {}

    ngOnInit() {
        this.loading = this.loadCtrl.create({content: 'Confirmando usuario...'});

        this.users$ = this.db.list('/users');

        this.authenticated = this.authService.authenticationStream.subscribe(data => {
            if (data.loggedIn && !data.errors) {
                this.loginError = false;
                
                // Get User Data
                
                let loggedInUser = this.registeredUsers.filter(u => u.email === this.username)[0];
                //console.log(loggedInUser);

                if (!!loggedInUser) {
                    if (loggedInUser.userType === 'WATCHER') {
                        this.userInfo.addWatcher(loggedInUser);
                    } else {
                        this.userInfo.addProvider(loggedInUser);
                    }
                    this.loggedIn.emit({ user: this.username, password: this.password});
                    this.navCtrl.setRoot(TabsPage);
                } else {
                    console.log('User not found');
                }
                this.isLoading = false;
            } else {
                 // Some error
                 this.loginError = true;
                 this.isLoading = false; 
                 console.log(data.errors);
            }
            this.loading.dismiss();
        });

        this.users$ = this.db.list('/users');

        this.users$.valueChanges().subscribe(data => {
            console.log(data);
            this.registeredUsers = data;
        }, err => console.log(err));
    }

    ngOnDestroy() {
        if (!!this.authenticated) {
            this.authenticated.unsubscribe();
        }
    }

    handleError(errors: any): void {
        this.isLoading = false;
    }

    private goToRegisterPage(): void {
        this.navCtrl.push(RegisterPage);
    }

    private async login(form: any) {
        console.log(this.form);
        
        if (this.form.valid) {
            this.isLoading = true;
            
            // Loading controller
            this.loading.present();

            this.formNotValid = false;
            this.authService.login(this.username, this.password);
        }else {
            this.formNotValid = true;
        }
    }
}