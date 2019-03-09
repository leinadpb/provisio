import { Injectable } from '@angular/core';
import { SQLite, SQLiteDatabaseConfig, SQLiteObject } from '@ionic-native/sqlite';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs'
import 'rxjs/operators/map';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Platform } from 'ionic-angular';

@Injectable()
export class SqlService {

    database: SQLiteObject;
    private databaseReady: BehaviorSubject<boolean>;
    private dbNameCategories: string = 'categories';
    private dbNameProducts: string = 'products';
    private dbName: string = 'provisio.db';

    constructor(private sqLite: SQLite, private http: Http,
        private sqlitePorter: SQLitePorter, private storage: Storage,
        private platform: Platform) 
    {
        this.databaseReady = new BehaviorSubject(false);
        this.platform.ready().then(() => {
            this.sqLite.create({
                name: this.dbName,
                location: 'default',
            })
            .then((db: SQLiteObject) => {
                this.database = db;
                this.storage.get('database_filled').then(val => {
                    if (val) {
                        this.databaseReady.next(true);
                    } else {
                        this.fillDatabase();
                    }
                })
            })
        });
    }

    /** GET */
    getAllCategories() {
        return this.database.executeSql(`SELECT * from ${this.dbNameCategories} 
        ORDER BY created_at asc`);
    }
    getAllProducts() {
        return this.database.executeSql(`SELECT * from ${this.dbNameProducts}
        ORDER BY created_at asc`);
    }
    getProductsByEmail(email: string) {
        return this.database.executeSql(`SELECT * from ${this.dbNameProducts}
        WHERE user_email = lower(${email})`);
    }

    /** ADD */
    addCategory(name, description) {
        let date = new Date();
        let data = [name, description, date.getTime(), date.getTime()];
        return this.database.executeSql(`INSERT INTO ${this.dbNameCategories}
        (name, description, created_at, last_modified) VALUES (?, ?, ?, ?)`, data);
    }
    addProduct(name, description, image_url, user_email) {
        let date = new Date();
        let data = [name, description, image_url, user_email, date.getTime(), date.getTime()];
        return this.database.executeSql(`INSERT INTO ${this.dbNameProducts}
        (name, description, image_url, user_email, created_at, last_modified)
        VALUES (?, ?, ?, ?, ?, ?)`, data);
    }

    /** DELETE (maldito delete xd) */
    deleteAllCategories() {
        return this.database.executeSql(`DELETE FROM ${this.dbNameCategories}`);
    }
    deleteAllProducts() {
        //WARNING!!!  ALl products will be removed from the database.
        return this.database.executeSql(`DELETE FROM ${this.dbNameProducts}`);
    }
    deleteAllProductsByEmail(email: string) {
        return this.database.executeSql(`DELETE FROM ${this.dbNameProducts}
        WHERE user_email = lower(${email})`);
    }
    
    /** Useful functions */
    clearStorage() {
        return this.storage.clear();
    }
    fillDatabase() {
        this.http.get('dummyData.sql3')
        .pipe(map(res => res.text()))
        .subscribe(sql => {
            this.sqlitePorter.importSqlToDb(this.database, sql)
            .then(data => {
                this.databaseReady.next(true);
                this.storage.set('database_filled', true);
            })
            .catch(err => console.log(err));
        })
    }
    getDatabaseState() {
        return this.databaseReady.asObservable();
    }

    /** For testing purposes */
    addItem(name, description) {
        let date = new Date();
        let data = [name, description, date.getTime(), date.getTime()];
        return this.database
        .executeSql("INSERT INTO items (name, description, created_at, last_modified) VALUES (?, ?, ?, ?)", data)
        .then(res => {
            return res;
        })
    }
    deleteAll() {
        return this.database
        .executeSql("DELETE FROM items");
    }
    getAllItems() {
        return this.database.executeSql("SELECT * from items ORDER BY created_at asc", [])
            .then(data => {
                let items = [];
                if (data.rows.length > 0) {
                    for(let i = 0; i < data.rows.length; i++){
                        items.push({
                            name: data.rows.item(i).name,
                            description: data.rows.item(i).description
                        });
                    }
                }
                return items;
            }, err => {
                console.log(err);
                return [];
            });
    }

}