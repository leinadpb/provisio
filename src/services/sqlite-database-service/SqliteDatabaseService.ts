import { Injectable, EventEmitter, Output } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class SqliteDatabaseService {

    @Output() addedValue = new EventEmitter<any>();
    @Output() removedValue = new EventEmitter<any>();

    constructor(private storage: Storage) {

    }

    add (key: any, value: any) {
        if (!!key) {
            this.storage.set(key, value);
            this.addedValue.emit({key: key, value: value});
        }
    }

    remove (key: any) {
        if (!!key) {
            this.storage.get(key).then(value => {
                this.storage.remove(key);
                this.removedValue.emit({key: key, value: value});
            });
        }
        
    }

    update (key: any, newValue: any) {
        if (!!key) {
            this.storage.get(key).then(item => {
                if (!!item && item !== newValue) {
                    this.storage.set(key, newValue);
                }
            });
        }
    }

    get (key: any): any {
        if (!!key) {
            return this.storage.get(key);
        }
    }
}