import { Input, Component, Output, OnDestroy, EventEmitter, OnInit, ErrorHandler, ViewChild} from "@angular/core";
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth-service';
import { Subscription } from "rxjs";
import { NgForm } from '@angular/forms';
import { RegisterPage } from '../register/register';

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

    @ViewChild(NgForm) private form: NgForm;

    @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();

    constructor (private navCtrl: NavController, private authService: AuthService) {}

    ngOnInit() {
        this.authenticated = this.authService.authenticationStream.subscribe(data => {
            if (data.loggedIn && !data.errors) {
                this.loginError = false;
                this.loggedIn.emit({ user: this.username, password: this.password});
                this.navCtrl.setRoot(TabsPage);
                this.isLoading = false;
            } else {
                 // Some error
                 this.loginError = true;
                 this.isLoading = false;
            }
        });
    }

    ngOnDestroy() {
        if (!!this.authenticated) {
            this.authenticated.unsubscribe();
        }
    }

    handleError(erro: any): void {
        this.isLoading = false;
    }

    private goToRegisterPage(): void {
        this.navCtrl.push(RegisterPage);
    }

    private login(form: any) {
        console.log(this.form);
        if (this.form.valid) {
            this.isLoading = true;
            this.formNotValid = false;
            this.authService.login(this.username, this.password);
        }else {
            this.formNotValid = true;
        }
    }
}