import { Injectable, Input } from '@angular/core';

@Injectable()
export class UserInfoService {

    // common
    @Input() name: string;
    @Input() type: string;
    @Input() email: string;
    @Input() watchers: Array<any>;
    
    // watcher
    @Input() lastname: string;
    @Input() imageUrl: string;

    // provider
    @Input() motto: string;
    @Input() phone: string;
    @Input() address: string;
    @Input() videoUrl: string;
    @Input() audioUrl: string;
    @Input() logoUrl: string;
    @Input() watchingCount: number;

    reset() {
        this.name = "";
        this.type = "";
        this.email = "";
        this.watchers = [];
        this.lastname = "";
        this.imageUrl = "";
        this.motto = "";
        this.phone = "";
        this.address = "";
        this.videoUrl = "";
        this.audioUrl = "";
        this.logoUrl = "";
        this.watchingCount = 0;
    }

    addWatcher(user: any) {
        this.reset();
        this.name = user.name;
        this.lastname = user.lastname;
        this.email = user.email;
        this.watchers = user.watcher;
        this.imageUrl = user.imageUrl;
        this.type = user.type;
    }

    addProvider(user: any) {
        this.reset();
        this.name = user.name;
        this.motto = user.motto;
        this.email = user.email;
        this.watchers = user.watchers;
        this.audioUrl = user.audioUrl;
        this.logoUrl = user.logoUrl;
        this.videoUrl = user.videoUrl;
        this.phone = user.phone;
        this.address = user.address;
        this.watchingCount = user.watchingCount;
        this.type = user.type;
    }

    addUser(email, name) {
        this.reset();
        this.email = email;
        this.name = name;
    }
}