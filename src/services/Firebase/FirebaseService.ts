import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseService {
    constructor (private auth: AngularFireAuth) {}

    loginWithUsernamePassword (username, password) {
        return this.auth.auth.signInWithEmailAndPassword(username, password);
    }

    logout() {
        return this.auth.auth.signOut();
    }


}