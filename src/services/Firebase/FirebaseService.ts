import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product, Watcher, Provider } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseService implements OnInit{

    public users$: AngularFireList<any[]>;

    constructor (private auth: AngularFireAuth, private db: AngularFireDatabase) {}

    ngOnInit(): void {
        console.log(this.db);
        this.users$ = this.db.list("/users");
    }

    loginWithUsernamePassword (username, password) {
        return this.auth.auth.signInWithEmailAndPassword(username, password);
    }

    existsPromise(email: string): Promise<any> {
        return this.auth.auth.fetchProvidersForEmail(email);
    }

    logout() {
        return this.auth.auth.signOut();
    }

    readAllUsers(): AngularFireList<any[]> {
        return this.users$;
    }

    register(email, password) {
        return this.auth.auth.createUserWithEmailAndPassword(email, password);
    }

}