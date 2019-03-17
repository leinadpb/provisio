import { Injectable, Input } from '@angular/core';

@Injectable()
export class UserInfoService {

    // common
    @Input() name: string;
    @Input() type: string;
    @Input() email: string;
    @Input() watchers: any[];
    @Input() docId: any;
    
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
    @Input() website: string;

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
        this.website = '';
    }

    addWatcher(user: any, addedKey?: any) {
        this.reset();
        this.docId = !!user.docId? user.docId : addedKey;
        this.name = user.name;
        this.lastname = user.lastname;
        this.email = user.email;
        this.watchers = user.watchers;
        this.imageUrl = user.imageUrl;
        this.type = user.userType;
    }

    addProvider(user: any, addedKey?: any) {
        this.reset();
        this.docId = !!user.docId? user.docId : addedKey;
        this.name = user.name;
        this.motto = user.motto;
        this.email = user.email;
        this.watchers = user.watchers;
        this.audioUrl = user.audioUrl;
        this.logoUrl = user.profileImageUrl;
        this.videoUrl = user.videoUrl;
        this.phone = user.phone;
        this.address = user.address;
        this.watchingCount = user.watchingCount;
        this.type = user.userType;
        this.website = user.website;
    }

    addUser(email, name) {
        this.reset();
        this.email = email;
        this.name = name;
    }
}