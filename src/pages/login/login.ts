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

    @ViewChild(NgForm) private form: NgForm;

    @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();

    constructor (private navCtrl: NavController, private authService: AuthService,
        private loadCtrl: LoadingController, private fireService: FirebaseService,
        private db: AngularFireDatabase, private userInfo: UserInfoService) {}

    ngOnInit() {
        this.loading = this.loadCtrl.create({content: 'Confirmando usuario...'});

        this.authenticated = this.authService.authenticationStream.subscribe(data => {
            if (data.loggedIn && !data.errors) {
                this.loginError = false;
                
                // Get User Data
                // TODO...
                
                // Update User Info Service
                // TODO...

                this.loggedIn.emit({ user: this.username, password: this.password});
                this.navCtrl.setRoot(TabsPage);
                this.isLoading = false;
            } else {
                 // Some error
                 this.loginError = true;
                 this.isLoading = false; 
            }
            this.loading.dismiss();
        });

        this.users$ = this.db.list('/users');
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

    private login(form: any) {
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