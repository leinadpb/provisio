import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';

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

    readAllUsers(): Observable<any> {
        return this.db.list("/users").valueChanges();
    }

    removeProviderFromUserWatchersList(watcherEmail, providerEmail, watcherDocId, providerDocId) {
        console.log('Will remove from wacher list >>>> ');
        console.log(watcherEmail, providerEmail, watcherDocId, providerDocId);
        let user = this.db.object(`/users/${watcherDocId}`);
        let provider = this.db.object(`/users/${providerDocId}`);
        // GET curretn watchers list
        let currentWatchers = [];
        let providerCurrentWatchers = [];
        let userCurrentWatchersFetched: boolean = false;
        let providerCurrentWatchersFetched: boolean = false;

        user.valueChanges().subscribe((data: any) => {
            currentWatchers = (!!data.watchers)? data.watchers : [];
            if (!userCurrentWatchersFetched) {
                currentWatchers = currentWatchers.filter(x => x !== providerEmail);
                user.update({
                    watchers: [...currentWatchers]
                });
            }
            userCurrentWatchersFetched = true;
        });
        provider.valueChanges().subscribe((data: any) => {
            providerCurrentWatchers = (!!data.watchers)? data.watchers : [];
            if (!providerCurrentWatchersFetched) {
                providerCurrentWatchers = providerCurrentWatchers.filter(x => x !== watcherEmail);
                provider.update({
                    watchers: [...providerCurrentWatchers]
                });
            }
            providerCurrentWatchersFetched = true;
        });
    }

    addProviderToUserWatchersList(watcherEmail, providerEmail, watcherDocId, providerDocId) {
        let user = this.db.object(`/users/${watcherDocId}`);
        let provider = this.db.object(`/users/${providerDocId}`);
        
        // GET current watchers list
        let userCurrentWatchers = [];
        let providerCurrentWatchers = [];
        let userCurrentWatchersFetched: boolean = false;
        let providerCurrentWatchersFetched: boolean = false;

        user.valueChanges().subscribe((data: any) => {
            userCurrentWatchers = (!!data.watchers)? data.watchers : [];
            console.log('After values changes: ');
            console.log(data);
            if (!userCurrentWatchersFetched) {
                user.update({
                    watchers: [...userCurrentWatchers, providerEmail]
                });
            }
            userCurrentWatchersFetched = true;
        });

        provider.valueChanges().subscribe((data: any) => {
            providerCurrentWatchers = (!!data.watchers)? data.watchers : [];
            console.log('After values changes: ');
            console.log(data);
            if (!providerCurrentWatchersFetched) {
                provider.update({
                    watchers: [...providerCurrentWatchers, watcherEmail]
                });
            }
            providerCurrentWatchersFetched = true;
        });      
    
    }

    createPushId() {
        return this.db.createPushId();
    }

    register(email, password) {
        return this.auth.auth.createUserWithEmailAndPassword(email, password);
    }

}