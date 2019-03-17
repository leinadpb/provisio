webpackJsonp([1],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__register_register__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_Firebase_FirebaseService__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_user_info__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, authService, loadCtrl, fireService, db, userInfo) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.loadCtrl = loadCtrl;
        this.fireService = fireService;
        this.db = db;
        this.userInfo = userInfo;
        this.loginError = false;
        this.formNotValid = false;
        this.loggedIn = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = this.loadCtrl.create({ content: 'Confirmando usuario...' });
        this.users$ = this.db.list('/users');
        this.authenticated = this.authService.authenticationStream.subscribe(function (data) {
            if (data.loggedIn && !data.errors) {
                _this.loginError = false;
                // Get User Data              
                var loggedInUser = _this.registeredUsers.filter(function (u) { return u.email === _this.username; })[0];
                if (!!loggedInUser) {
                    if (loggedInUser.userType === 'WATCHER') {
                        _this.userInfo.addWatcher(loggedInUser);
                    }
                    else {
                        _this.userInfo.addProvider(loggedInUser);
                    }
                    _this.loggedIn.emit({ user: _this.username, password: _this.password });
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    console.log('User not found');
                }
                _this.isLoading = false;
            }
            else {
                // Some error
                _this.loginError = true;
                _this.isLoading = false;
                console.log(data.errors);
            }
            _this.loading.dismiss();
        });
        this.users$ = this.db.list('/users');
        this.users$.valueChanges().subscribe(function (data) {
            console.log(data);
            _this.registeredUsers = data;
        }, function (err) { return console.log(err); });
    };
    LoginPage.prototype.ngOnDestroy = function () {
        if (!!this.authenticated) {
            this.authenticated.unsubscribe();
        }
    };
    LoginPage.prototype.handleError = function (errors) {
        this.isLoading = false;
    };
    LoginPage.prototype.goToRegisterPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.login = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(this.form);
                if (this.form.valid) {
                    this.isLoading = true;
                    // Loading controller
                    this.loading.present();
                    this.formNotValid = false;
                    this.authService.login(this.username, this.password);
                }
                else {
                    this.formNotValid = true;
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], LoginPage.prototype, "username", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], LoginPage.prototype, "password", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* NgForm */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* NgForm */])
    ], LoginPage.prototype, "form", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], LoginPage.prototype, "loggedIn", void 0);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/login/login.html"*/'<ion-grid>\n    <ion-row>\n        <ion-card style="padding-top: 20px;">\n            <img src="../../assets/imgs/logo.svg" width="50px" height="60px" />\n            <ion-card-content>\n                <form #form (ngSubmit)="login($event)">\n                    <ion-list>\n                        <ion-item>\n                            <ion-label stacked>Usuario</ion-label>\n                            <ion-input required name="username" placeholder="test@test.com" type="email" [(ngModel)]="username"></ion-input>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label stacked>Contraseña</ion-label>\n                            <ion-input required name="password" placeholder="admin123" type="password" [(ngModel)]="password"></ion-input>\n                        </ion-item>\n                        <span *ngIf="isLoading">cargando...</span>\n                        <span *ngIf="loginError">Usuario o contrasena no valido.</span>\n                        <span *ngIf="formNotValid">Email no valido.</span>\n                    </ion-list>\n                    <div style="margin-top: 15px;">\n                        <button ion-button full type="submit">Iniciar Sesión</button>\n                    </div>\n                </form>\n            </ion-card-content>\n        </ion-card>\n        <div style="padding: 10px; margin-top: 15px;">\n            <a (click)="goToRegisterPage()">No tienes una cuenta? Registrate</a>\n        </div>\n    </ion-row>\n</ion-grid>'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_6__services_Firebase_FirebaseService__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["AngularFireDatabase"], __WEBPACK_IMPORTED_MODULE_8__services_user_info__["a" /* UserInfoService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_Firebase_FirebaseService__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_user_info_UserInfoService__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, authService, db, firebase, userInfo) {
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.db = db;
        this.firebase = firebase;
        this.userInfo = userInfo;
        this.itemList = [];
        this.originalData = this.itemList;
        this.currentUser = this.authService.getUserEmail();
        this.isLoggedIn = this.authService.isAuthenticated();
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.firebase.readAllUsers().subscribe(function (data) {
            console.log('DATA:');
            console.log(data);
            _this.providers = data.filter(function (x) { return x.userType === 'PROVIDER'; });
            console.log(_this.providers);
        });
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.loadItemData();
    };
    HomePage.prototype.loadItemData = function () {
        var _this = this;
        this.firebase.readAllUsers().subscribe(function (data) {
            console.log('DATA:');
            console.log(data);
            _this.itemList = data.filter(function (x) { return x.userType === 'PROVIDER' && x.email !== _this.userInfo.email; });
            _this.originalData = _this.itemList;
            console.log(_this.providers);
        });
    };
    HomePage.prototype.getItems = function (ev) {
        this.itemList = this.originalData;
        var val = ev.target.value;
        if (val && val.trim() != '') {
            this.itemList = this.itemList.filter(function (item) {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    HomePage.prototype.viewDetail = function (email) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], { 'email': email });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/home/home.html"*/'<ion-header>\n\n  <ion-navbar text-center color="primary">\n    <ion-title>Provisio</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n\n  <ion-list>\n    <ion-item *ngFor="let p of itemList">\n      <ion-card text-wrap>\n        <img [src]="p.profileImageUrl" width="100%" height="200px"/>\n        <ion-card-content>\n          <ion-card-title>\n            {{p.name}}\n          </ion-card-title>\n          <p align="justify">\n           {{p.motto}}\n          </p>\n          <button ion-button icon-end float-right (click)="viewDetail(p.email)">\n            Ver\n            <ion-icon name="eye"></ion-icon>\n          </button>\n        </ion-card-content>\n      </ion-card>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["AngularFireDatabase"], __WEBPACK_IMPORTED_MODULE_5__services_Firebase_FirebaseService__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_6__services_user_info_UserInfoService__["a" /* UserInfoService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddproductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__create_product_create_product__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AddproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddproductPage = /** @class */ (function () {
    function AddproductPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AddproductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddproductPage');
    };
    AddproductPage.prototype.viewCreateProductPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__create_product_create_product__["a" /* CreateProductPage */]);
    };
    AddproductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/addproduct/addproduct.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Mis Productos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n<ion-card>\n	<ion-item>\n		<ion-icon name="search" item-start></ion-icon>\n		<ion-input type="text" value="" placeholder="Buscar Producto o Servicio"></ion-input>\n	</ion-item>\n</ion-card>\n<ion-item>\n  <button ion-button item-end float-right round (click)="viewCreateProductPage()">\n    <ion-icon name="add" item-start></ion-icon> Agregar Nuevo\n  </button>\n</ion-item>\n<ion-list>\n  <ion-item>\n    <ion-thumbnail item-start>\n      <img src="https://ui.assets-asda.com/dm/asdagroceries/5900020031372_T1?defaultImage=asdagroceries/noImageAvailable&resMode=sharp2&id=sSbSn0&fmt=jpg&fit=constrain,1&wid=280&hei=280">\n    </ion-thumbnail>\n    <h2>Nesquik Cereal</h2>\n    <p>Cereal Nesquik de Chocolate</p>\n    <button ion-button clear item-end (click)="viewCreateProductPage()">Editar</button>\n    <button ion-button clear item-end color=\'danger\'>Eliminar</button>\n  </ion-item>\n  <ion-item>\n    <ion-thumbnail item-start>\n      <img src="https://images-na.ssl-images-amazon.com/images/I/91wlWwFYbWL._AC_UL200_SR200,200_.jpg">\n    </ion-thumbnail>\n    <h2>Nescafé Clásico</h2>\n    <p>Café oscuro</p>\n    <button ion-button clear item-end (click)="viewCreateProductPage()">Editar</button>\n    <button ion-button clear item-end color=\'danger\'>Eliminar</button>\n  </ion-item>\n  <ion-item>\n    <ion-thumbnail item-start>\n      <img src="https://storage.googleapis.com/zopnow-static/images/products/320/nestle-milk-chocolate-v-18-g.png">\n    </ion-thumbnail>\n    <h2>Nestlé Classic</h2>\n    <p>Barra de chocolate</p>\n    <button ion-button clear item-end (click)="viewCreateProductPage()">Editar</button>\n    <button ion-button clear item-end color=\'danger\'>Eliminar</button>\n  </ion-item>\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/addproduct/addproduct.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], AddproductPage);
    return AddproductPage;
}());

//# sourceMappingURL=addproduct.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__addproduct_addproduct__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_config_service__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_user_info_UserInfoService__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsPage = /** @class */ (function () {
    function TabsPage(configs, user) {
        this.configs = configs;
        this.user = user;
        this.homePage = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.profilePage = __WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */];
        this.aboutPage = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.addProductPage = __WEBPACK_IMPORTED_MODULE_4__addproduct_addproduct__["a" /* AddproductPage */];
        this.isProvider = true; // Get this from auth service
        if (user.type === 'WATCHER') {
            this.isProvider = false;
        }
        else {
            this.isProvider = true;
        }
        console.log(user);
        console.log("USER TYPE IS: " + user.type);
    }
    TabsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.configs.getJSON().subscribe(function (data) {
            _this.homeTitle = data['APP_NAME'];
            _this.aboutTitle = data['APP_NAME'];
            _this.contactTitle = data['APP_NAME'];
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], TabsPage.prototype, "homeTitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], TabsPage.prototype, "aboutTitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], TabsPage.prototype, "contactTitle", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], TabsPage.prototype, "profileTitle", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/tabs/tabs.html"*/'<ion-tabs>\n	<ion-tab [root]="homePage" [tabTitle]="\'Inicio\'" tabIcon="home"></ion-tab>\n  <ion-tab [root]="profilePage" [tabTitle]="\'Mi Perfil\'" tabIcon="person"></ion-tab>\n  <ion-tab [root]="aboutPage" [tabTitle]="\'Acerca de\'" tabIcon="information-circle"></ion-tab>\n</ion-tabs>\n<ion-tabs *ngIf="isProvider">\n	<ion-tab [root]="homePage" [tabTitle]="\'Inicio\'" tabIcon="home"></ion-tab>\n	<ion-tab [root]="addProductPage" [tabTitle]="\'Productos\'" tabIcon="add-circle"></ion-tab>\n  <ion-tab [root]="profilePage" [tabTitle]="\'Mi Perfil\'" tabIcon="person"></ion-tab>\n  <ion-tab [root]="aboutPage" [tabTitle]="\'Acerca de\'" tabIcon="information-circle"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_6__services_user_info_UserInfoService__["a" /* UserInfoService */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SqliteDatabaseService__ = __webpack_require__(523);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__SqliteDatabaseService__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addproduct_addproduct__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CreateProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreateProductPage = /** @class */ (function () {
    function CreateProductPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CreateProductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateProductPage');
    };
    CreateProductPage.prototype.viewAddProductPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__addproduct_addproduct__["a" /* AddproductPage */]);
    };
    CreateProductPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-product',template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/create-product/create-product.html"*/'<!--\n  Generated template for the CreateProductPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar text-center color="primary">\n    <ion-title>Agregar Nuevo Producto</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-label floating>Nombre</ion-label>\n    <ion-input type="text"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label floating>Descripción</ion-label>\n    <ion-input type="text"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>Categoría</ion-label>\n    <ion-select>\n      <ion-option value="nes">Comidas o Bebidas</ion-option>\n      <ion-option value="n64">Categoria 2</ion-option>\n      <ion-option value="ps">Categoria 3</ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <ion-label stacked>Videos</ion-label>\n    <ion-input name="video" type="file"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label stacked>Audios</ion-label>\n    <ion-input name="audio" type="file"></ion-input>\n  </ion-item>      \n\n  <ion-row>\n    <ion-col text-center>\n      <button ion-button block color="default" (click)="viewAddProductPage()">\n        Guardar\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/create-product/create-product.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], CreateProductPage);
    return CreateProductPage;
}());

//# sourceMappingURL=create-product.js.map

/***/ }),

/***/ 230:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 230;

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/create-product/create-product.module": [
		606,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 272;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage.prototype.ngOnInit = function () {
        if (this.text === undefined) {
            // this.text = this.authService.testService(); 
        }
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar text-center color="primary">\n    <ion-title>\n      Acerca de\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n    <ion-list>\n        <ion-item>\n         <ion-label><strong>Nombre de la aplicación:</strong> Provisio</ion-label>\n     </ion-item>\n        <ion-item>\n         <ion-label><strong>Versión:</strong> 0.01a</ion-label>\n    </ion-item>\n    <ion-item>\n         <ion-label><strong>Usuarios registrados:</strong> 21 usuarios</ion-label>\n     </ion-item>\n    </ion-list>\n</ion-content>\n\n\n\n\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_youtube_video_player__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_streaming_media__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_user_info_UserInfoService__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_Firebase_FirebaseService__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var DetailPage = /** @class */ (function () {
    function DetailPage(youtube, loadCtrl, audioPlayer, nativePath, streaming, navCtrl, userInfo, navParams, firebase) {
        this.youtube = youtube;
        this.loadCtrl = loadCtrl;
        this.audioPlayer = audioPlayer;
        this.nativePath = nativePath;
        this.streaming = streaming;
        this.navCtrl = navCtrl;
        this.userInfo = userInfo;
        this.navParams = navParams;
        this.firebase = firebase;
        this.audioSelected = false;
        this.starSelected = false;
        this.watchers = 0;
        this.provider = {};
        this.providerWatchers = [];
        this.currentUserIsWatchingViewingProvider = false;
        this.options = {
            successCallback: function () { console.log('Video played'); },
            errorCallback: function (e) { console.log('Error streaming'); },
            orientation: 'landscape',
            controls: true
        };
        this.fetchingProviderInfo = this.loadCtrl.create({
            content: 'Obteniendo informacion del proveedor...'
        });
        this.optionsAudio = {
            bgColor: "#FFFFFF",
            bgImage: "http://pluspng.com/img-png/nestle-logo-vector-png-posted-605.jpg",
            bgImageScale: "fit",
            initFullscreen: false,
            keepAwake: false,
            successCallback: function () {
                console.log("Player closed without error.");
            },
            errorCallback: function (errMsg) {
                console.log("Error! " + errMsg);
            }
        };
    }
    DetailPage.prototype.ngOnInit = function () {
        this.selectedProviderEmail = this.navParams.get('email');
        this.getInfo(this.selectedProviderEmail);
        this.loading = this.loadCtrl.create({
            content: 'Cargando video...'
        });
    };
    DetailPage.prototype.getInfo = function (email, withoutLoading) {
        if (withoutLoading === void 0) { withoutLoading = false; }
        if (!withoutLoading)
            this.fetchingProviderInfo.present();
        this.updateUser(email);
        if (!withoutLoading)
            this.fetchingProviderInfo.dismiss();
    };
    DetailPage.prototype.updateUser = function (email) {
        var _this = this;
        this.firebase.readAllUsers().subscribe(function (data) {
            _this.provider = data.filter(function (x) { return x.userType === 'PROVIDER' && x.email === email; })[0];
            console.log('Provider fetched: ');
            console.log(_this.provider);
            _this.providerWatchers = (!!_this.provider.watchers) ? _this.provider.watchers : [];
            if (_this.providerWatchers.length > 0) {
                _this.ifCurrentUserIsWatchingViewingProvider(_this.providerWatchers);
            }
            else {
                _this.currentUserIsWatchingViewingProvider = false;
            }
        });
    };
    DetailPage.prototype.ifCurrentUserIsWatchingViewingProvider = function (watchers) {
        var _this = this;
        console.log('Before verifying if current user is watchnig provider....');
        console.log(watchers);
        console.log(this.userInfo.email);
        var value = watchers.filter(function (x) { return x === _this.userInfo.email; })[0];
        console.log(value);
        if (!!value)
            this.currentUserIsWatchingViewingProvider = true;
        else
            this.currentUserIsWatchingViewingProvider = false;
    };
    DetailPage.prototype.toggleAudio = function () {
        alert('Play audio');
        // this.audioPlayer.play('uniqueId1');
        this.streaming.playAudio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', this.optionsAudio);
    };
    DetailPage.prototype.toggleVideo = function () {
        // this.openVideo('1i6c3HNiYNw&t=46s'); --- It's working
        this.streaming.playVideo('https://app.coverr.co/s3/mp4/Road-candies.mp4', this.options);
    };
    DetailPage.prototype.openVideo = function (videoId) {
        var _this = this;
        // Playing a video.
        this.loading.present();
        setTimeout(function () {
            _this.loading.dismiss();
            _this.youtube.openVideo(videoId);
        }, 2000);
    };
    DetailPage.prototype.startWatching = function () {
        // Get watcher email
        var watcherEmail = this.userInfo.email;
        // Get viewing provider email
        var providerEmail = this.provider.email;
        // Add provider email to array of "Watchers" of current user in firebase DB.
        this.firebase.addProviderToUserWatchersList(watcherEmail, providerEmail, this.userInfo.docId, this.provider.docId);
        this.updateUser(providerEmail);
    };
    DetailPage.prototype.stopWatching = function () {
        // Get watcher email
        var watcherEmail = this.userInfo.email;
        // Get viewing provider email
        var providerEmail = this.provider.email;
        // Add provider email to array of "Watchers" of current user in firebase DB.
        this.firebase.removeProviderFromUserWatchersList(watcherEmail, providerEmail, this.userInfo.docId, this.provider.docId);
        this.currentUserIsWatchingViewingProvider = false;
        this.updateUser(providerEmail);
    };
    DetailPage.prototype.verProductosSimilares = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], DetailPage.prototype, "watchers", void 0);
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/detail/detail.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Detail</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-card>\n      <ion-row>\n          <ion-col col-7></ion-col>\n          <ion-col col-5 item-end>\n            <b>{{ (!!providerWatchers)? providerWatchers.length : 0 }}</b> observadores\n          </ion-col>\n        </ion-row>\n      <ion-item>\n        <ion-avatar item-start>\n          <img [src]="provider.profileImageUrl">\n        </ion-avatar>\n        <h2>{{ provider.name }}</h2>\n        <p>{{ provider.motto  }}</p>\n      </ion-item>\n\n      <ion-row style="text-align: center;">\n        <ion-col>\n          <button ion-button icon-start clear small (click)="toggleVideo()" color=\'danger\'>\n            <ion-icon isActive="true" name="logo-youtube"></ion-icon>\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-start clear small (click)="toggleAudio()" color=\'dark\'>\n            <ion-icon isActive="false" name="megaphone"></ion-icon>\n          </button>\n        </ion-col>\n        <ion-col>\n          <button *ngIf="!currentUserIsWatchingViewingProvider" ion-button icon-start clear small (click)="startWatching()" color=\'light\'>\n            <ion-icon isActive="true" name="eye"></ion-icon>\n          </button>\n          <button *ngIf="currentUserIsWatchingViewingProvider" ion-button icon-start clear small (click)="stopWatching()" color=\'light\'>\n            <ion-icon isActive="false" name="eye-off"></ion-icon>\n          </button>\n        </ion-col>\n      </ion-row>\n  </ion-card>\n\n  <ion-card>\n    <ion-item>\n      <p style="font-size:16px;font-style:regular;">\n          <b>Informacion del Proveedor</b> <span class="right"> </span>\n      </p>\n    </ion-item>\n    <ion-list>\n        <ion-item>\n            <ion-label><strong>Nombre:</strong> {{ provider.name }}</ion-label>\n        </ion-item>\n            <ion-item>\n            <ion-label><strong>Lema:</strong> {{ provider.motto }}</ion-label>\n        </ion-item>\n        <ion-item>\n            <ion-label><strong>Categoria: </strong> {{ provider.category }}</ion-label>\n        </ion-item>\n        <ion-item>\n          <ion-label><strong>Telefono: </strong> {{ provider.phone }}</ion-label>\n      </ion-item>\n        <ion-item>\n            <ion-label><strong>Website: </strong> {{ provider.website }}</ion-label>\n        </ion-item>\n    </ion-list>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/detail/detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_streaming_media__["a" /* StreamingMedia */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__services_user_info_UserInfoService__["a" /* UserInfoService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_8__services_Firebase_FirebaseService__["a" /* FirebaseService */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_info_UserInfoService__ = __webpack_require__(64);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProfilePage = /** @class */ (function () {
    function ProfilePage(app, auth, navCtrl, userInfo) {
        this.app = app;
        this.auth = auth;
        this.navCtrl = navCtrl;
        this.userInfo = userInfo;
    }
    ProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedOut = this.auth.authenticationStream.subscribe(function (data) {
            if (!data.loggedIn) {
                console.log('Im loged out now...');
                // this.nvCtrl.push(LoginPage);
                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
            }
        });
        this.userName = this.userInfo.name;
    };
    ProfilePage.prototype.ngOnDestroy = function () {
        if (!!this.loggedOut) {
            this.loggedOut.unsubscribe();
        }
    };
    ProfilePage.prototype.logout = function () {
        this.auth.logout();
    };
    ProfilePage.prototype.goToVerProductoPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/profile/profile.html"*/'<ion-header>\n    <ion-navbar text-center color="primary">\n        <ion-title>Perfil de Nestlé</ion-title>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <ion-card>\n        <ion-item>\n            <ion-avatar item-start *ngIf="userInfo.type === \'PROVIDER\'">\n                <img [src]="userInfo.logoUrl">\n            </ion-avatar>\n            <h2>{{ userName }} {{ (userInfo.type === \'WATCHER\')? userInfo.lastname : \'\' }}</h2>\n            <p>{{ (userInfo.type === \'PROVIDER\')? userInfo.motto : \'\'  }}</p>\n        </ion-item>\n    </ion-card>\n\n    <ion-content padding>\n        <ion-item>\n            <p style="font-size:16px;font-style:regular;">\n                <b>Informacion del Perfil</b> <span class="right"> </span>\n            </p>\n        </ion-item>\n        <ion-list>\n            <ion-item>\n                <ion-label><strong>Nombre:</strong> {{ userInfo.name }}</ion-label>\n            </ion-item>\n            <ion-item *ngIf="userInfo.type == \'PROVIDER\'">\n                <ion-label><strong>Descripción:</strong> {{ userInfo.motto }}</ion-label>\n            </ion-item>\n            <ion-item>\n                <ion-label><strong>Tipo de Perfil:</strong> {{ userInfo.type }}</ion-label>\n            </ion-item>\n            <ion-item>\n                <ion-label><strong>E-mail:</strong> {{ userInfo.email }}</ion-label>\n            </ion-item>\n            <ion-item *ngIf="userInfo.type == \'PROVIDER\'">\n                <ion-label><strong>Sitio Web:</strong> {{ userInfo.website }}</ion-label>\n            </ion-item>\n            <ion-item *ngIf="userInfo.type == \'PROVIDER\'">\n                <button ion-button color="primary" float-left (click)="goToVerProductoPage()">Ver Productos </button>\n            </ion-item>\n            <ion-item>\n                <button ion-button full color="dark" (click)="logout()">Cerrar sesion</button>\n            </ion-item>\n        </ion-list>\n    </ion-content>\n</ion-content>\n\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/profile/profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__services_user_info_UserInfoService__["a" /* UserInfoService */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfigService__ = __webpack_require__(586);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__ConfigService__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_upload_file__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_user_info__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_Firebase_FirebaseService__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, loadCtrl, authService, db, uploadService, fireService, userInfo, toastCtrl) {
        this.navCtrl = navCtrl;
        this.loadCtrl = loadCtrl;
        this.authService = authService;
        this.db = db;
        this.uploadService = uploadService;
        this.fireService = fireService;
        this.userInfo = userInfo;
        this.toastCtrl = toastCtrl;
        this.isWatcher = true;
        this.showImgPreview = false;
        this.isLoading = false;
        this.errorUserExists = false;
        this.hasErrors = false;
        // upload
        this.progress = 0;
        this.disabledCreate = false;
        this.imageHasBeenUploaded = false;
    }
    RegisterPage.prototype.ngOnInit = function () {
        var _this = this;
        this.creatingProviderLoading = this.loadCtrl.create({ content: 'Creating new provider user...' });
        this.creatingWatcherLoading = this.loadCtrl.create({ content: 'Creating new watcher user...' });
        this.registered = this.authService.registerStream.subscribe(function (data) {
            if (data.success) {
                _this.errorUserExists = false;
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]);
                if (!!_this.creatingProviderLoading)
                    _this.creatingProviderLoading.dismiss();
                if (!!_this.creatingWatcherLoading)
                    _this.creatingWatcherLoading.dismiss();
            }
            else {
                _this.errorUserExists = true;
                if (!!_this.creatingProviderLoading)
                    _this.creatingProviderLoading.dismiss();
                if (!!_this.creatingWatcherLoading)
                    _this.creatingWatcherLoading.dismiss();
            }
        });
        this.uploadService.fileStream.subscribe(function (data) {
            if (data.success) {
                _this.uploadInfo = data.uploadInfo;
                _this.disabledCreate = false;
            }
            _this.imageHasBeenUploaded = true;
        });
        this.uploadService.progressStream.subscribe(function (data) {
            //alert(data);
            _this.progress = data.value;
        });
        this.users$ = this.db.list('/users');
    };
    RegisterPage.prototype.presentImageProfileIsNeededToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Please, select a logo image from your cellphone.',
            duration: 3000,
            position: 'bottom',
            showCloseButton: true
        });
        toast.present();
    };
    RegisterPage.prototype.pushNewUser = function (data) {
        var _this = this;
        this.uploadService.getDownloadUrl(data.metadata.fullPath)
            .then(function (downloadUrl) {
            console.log('DOWNLOAD URL ------ ');
            console.log(downloadUrl);
            if (_this.isWatcher) {
                var user = {
                    docId: '',
                    name: _this.name,
                    lastname: _this.lastname,
                    email: _this.email,
                    password: _this.password,
                    profileImageUrl: downloadUrl,
                    userType: "WATCHER",
                    watchers: []
                };
                var addedKey = _this.users$.push(user).key;
                _this.setPushedObjectKey(addedKey);
                _this.authService.register(user, addedKey);
                _this.userInfo.addWatcher(user, addedKey);
            }
            else {
                var user = {
                    docId: '',
                    name: _this.nameProvider,
                    email: _this.email,
                    password: _this.password,
                    watchers: [],
                    profileImageUrl: downloadUrl,
                    userType: "PROVIDER",
                    videoUrl: !!_this.videoUrl ? _this.videoUrl : "",
                    audioUrl: !!_this.audioUrl ? _this.audioUrl : "",
                    motto: !!_this.motto ? _this.motto : "",
                    address: _this.address,
                    phone: _this.phone,
                    category: _this.category,
                    website: !!_this.website ? _this.website : "",
                    logoUrl: !!_this.logoUrl ? _this.logoUrl : ""
                };
                var addedKey = _this.users$.push(user).key;
                _this.setPushedObjectKey(addedKey);
                _this.authService.register(user, addedKey);
                _this.userInfo.addProvider(user, addedKey);
            }
        }, function (err) { console.log(err); });
    };
    RegisterPage.prototype.setPushedObjectKey = function (addedKey) {
        this.db.object("/users/" + addedKey).update({
            docId: addedKey
        });
    };
    RegisterPage.prototype.goToLoginPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    RegisterPage.prototype.selectLogo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.disabledCreate = true;
                        return [4 /*yield*/, this.uploadService.pickImage()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage.prototype.registerUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, addedKey;
            return __generator(this, function (_a) {
                if (this.isWatcher) {
                    if (!!this.name && !!this.email && !!this.lastname && !!this.password) {
                        this.creatingWatcherLoading.present();
                        user = {
                            docId: '',
                            name: this.name,
                            lastname: this.lastname,
                            email: this.email,
                            password: this.password,
                            profileImageUrl: 'https://www.sherwoodchamber.net/media/com_jbusinessdirectory/pictures/companies/0/profileicon-1489087706.png',
                            userType: "WATCHER",
                            watchers: []
                        };
                        addedKey = this.users$.push(user).key;
                        this.setPushedObjectKey(addedKey);
                        this.authService.register(user, addedKey);
                        this.userInfo.addWatcher(user, addedKey);
                    }
                    else {
                        console.log('Form not valid');
                    }
                }
                else {
                    if (!!this.nameProvider && !!this.email && !!this.password && !!this.address
                        && !!this.phone && this.category /*&& this.logoUrl*/) {
                        this.creatingProviderLoading.present();
                        if (this.imageHasBeenUploaded) {
                            this.pushNewUser(this.uploadInfo);
                        }
                    }
                    else {
                        console.log('Form not valid');
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "lastname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "email", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "password", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], RegisterPage.prototype, "isWatcher", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "logoUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "audioUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "videoUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "motto", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "address", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "phone", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "category", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "nameProvider", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], RegisterPage.prototype, "website", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "imgPreview", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], RegisterPage.prototype, "showImgPreview", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], RegisterPage.prototype, "errorUserExists", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], RegisterPage.prototype, "hasErrors", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], RegisterPage.prototype, "progress", void 0);
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/register/register.html"*/'<ion-content overflow-scroll="true">\n        <div class="top-switcher">\n            <button ion-button full outline color="dark" (click)="isWatcher = !isWatcher">\n                {{ isWatcher? "I\'m a provider" : "I\'m a watcher" }}\n            </button>\n        </div>\n        <ion-card>\n            <ion-card-content>\n                You\'re registering as a <b>{{isWatcher? \'watcher\':\'provider\'}}</b>.\n            </ion-card-content>\n        </ion-card>\n        <ion-card class="main-wrapper">\n            <ion-card-title text-center>Crear cuenta</ion-card-title>\n            <ion-card-content *ngIf="isWatcher">\n                <form (ngSubmit)="registerUser($event)">\n                    <ion-grid>\n                        <ion-row>\n                            <ion-col col-6>\n                                <ion-item>\n                                    <ion-label floating>Nombres</ion-label>\n                                    <ion-input required name="name" [(ngModel)]="name" type="text"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                            <ion-col col-6>\n                                <ion-item>\n                                    <ion-label floating>Apellidos</ion-label>\n                                    <ion-input required name="lastname" [(ngModel)]="lastname" type="text"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Email</ion-label>\n                                    <ion-input required name="email" [(ngModel)]="email" type="email"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Contrasena</ion-label>\n                                    <ion-input required name="password" [(ngModel)]="password" type="password"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                    <span *ngIf="errorUserExists" style="color: red;">\n                        Ya existe un usuario con este correo.\n                    </span>\n                    <div style="margin-top: 15px;">\n                        <button ion-button full type="submit" [disabled]="disabledCreate">Crear cuenta</button>\n                    </div>\n                </form>\n            </ion-card-content>\n            <ion-card-content *ngIf="!isWatcher">\n                <form (ngSubmit)="registerUser($event)">\n                    <ion-grid>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Nombre proveedor</ion-label>\n                                    <ion-input required name="nameProvider" [(ngModel)]="nameProvider" type="text"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Email</ion-label>\n                                    <ion-input required name="email" [(ngModel)]="email" type="email"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Lema</ion-label>\n                                    <ion-input required name="motto" [(ngModel)]="motto" type="text"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Direccion</ion-label>\n                                    <ion-input required name="address" [(ngModel)]="address" type="text"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Numero de contacto</ion-label>\n                                    <ion-input required name="phone" [(ngModel)]="phone" type="text"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Sitio web</ion-label>\n                                    <ion-input required name="website" [(ngModel)]="website" type="text"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                         <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Category</ion-label>\n                                    <ion-select name="category" [(ngModel)]="category">\n                                        <ion-option value="bebidas">Bebidas</ion-option>\n                                        <ion-option value="comidas">Comidas</ion-option>\n                                        <ion-option value="comidas-bebidas">Comidas y bebidas</ion-option>\n                                        <ion-option value="celulares">Celulares</ion-option>\n                                        <ion-option value="acero">Acero</ion-option>\n                                        <ion-option value="madera">Madera</ion-option>\n                                        <ion-option value="artesanales">Artesanales</ion-option>\n                                        <ion-option value="mouses">Mouses</ion-option>\n                                        <ion-option value="cama">Camas</ion-option>\n                                        <ion-option value="muebles">Muebles</ion-option>\n                                    </ion-select>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <ion-item>\n                                    <ion-label floating>Contrasena</ion-label>\n                                    <ion-input required name="password" [(ngModel)]="password" type="password"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <h5>Logo <i>(Requerido) </i><span *ngIf="progress > 0">{{ progress | number:\'3.0-2\' }}%</span></h5>\n                                <button ion-button type="button" (click)="selectLogo()">Select image</button>\n                                <p *ngIf="!!uploadedImageUrl">{{ uploadedImageUrl }}</p>\n                                <img *ngIf="!!uploadedImageUrl" [src]="uploadedImageUrl" width="15px" height="15px" />\n                            </ion-col>\n                        </ion-row>\n                        <!-- <ion-row>\n                            <ion-col col-12>\n                                <h5>Audio <i>(Opcional)</i></h5>\n                                <ion-item>\n                                    <ion-label stacked>Seleccionar audio</ion-label>\n                                    <ion-input name="audio" [(ngModel)]="audioUrl" type="file"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row>\n                        <ion-row>\n                            <ion-col col-12>\n                                <h5>Video <i>(Opcional)</i></h5>\n                                <ion-item>\n                                    <ion-label stacked>Seleccionar video</ion-label>\n                                    <ion-input name="video" [(ngModel)]="videoUrl" type="file"></ion-input>\n                                </ion-item>\n                            </ion-col>\n                        </ion-row> -->\n                    </ion-grid>\n                    <span *ngIf="errorUserExists" style="color: red;">\n                        Ya existe un usuario con este correo.\n                    </span>\n                    <div style="margin-top: 15px;">\n                        <button ion-button full type="submit" [disabled]="disabledCreate">Crear cuenta</button>\n                    </div>\n                </form>\n            </ion-card-content>\n        </ion-card>\n        <div style="padding: 10px; margin-top: 15px;">\n            <a (click)="goToLoginPage()">Volver al inicio de sesion</a>\n        </div>\n    </ion-content>'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/register/register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["AngularFireDatabase"],
            __WEBPACK_IMPORTED_MODULE_6__services_upload_file__["a" /* UploadFileService */], __WEBPACK_IMPORTED_MODULE_8__services_Firebase_FirebaseService__["a" /* FirebaseService */],
            __WEBPACK_IMPORTED_MODULE_7__services_user_info__["a" /* UserInfoService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadFileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



// FIREBASE

var UploadFileService = /** @class */ (function () {
    function UploadFileService(camera, file) {
        this.camera = camera;
        this.file = file;
        this.fileStream = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.progressStream = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    UploadFileService.prototype.ngOnInit = function () {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        // firebase.initializeApp({});
    };
    UploadFileService.prototype.getDownloadUrl = function (fullPath) {
        return __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]().ref(fullPath).getDownloadURL();
    };
    UploadFileService.prototype.pickImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var options, cameraInfo, blobInfo, uploadInfo, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = {
                            quality: 68,
                            destinationType: this.camera.DestinationType.FILE_URI,
                            encodingType: this.camera.EncodingType.JPEG,
                            mediaType: this.camera.MediaType.ALLMEDIA,
                            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        console.log('PICKING IMAGE DEBUG>>>>');
                        return [4 /*yield*/, this.camera.getPicture(options)];
                    case 2:
                        cameraInfo = _a.sent();
                        console.log(cameraInfo);
                        return [4 /*yield*/, this.makeFileIntoBlob('file://' + cameraInfo)];
                    case 3:
                        blobInfo = _a.sent();
                        console.log(blobInfo);
                        return [4 /*yield*/, this.uploadToFirebase(blobInfo)];
                    case 4:
                        uploadInfo = _a.sent();
                        console.log(uploadInfo);
                        this.fileStream.emit({
                            uploadInfo: uploadInfo,
                            success: true,
                            blob: this.blobImage
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // FILE STUFF
    UploadFileService.prototype.makeFileIntoBlob = function (_imagePath) {
        var _this = this;
        // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
        return new Promise(function (resolve, reject) {
            var fileName = "";
            _this.file
                .resolveLocalFilesystemUrl(_imagePath)
                .then(function (fileEntry) {
                var name = fileEntry.name, nativeURL = fileEntry.nativeURL;
                // get the path..
                var path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
                console.log("path: ", path);
                console.log("fileName: ", name);
                fileName = name;
                // we are provided the name, so now read the file into
                // a buffer
                return _this.file.readAsArrayBuffer(path, name);
            })
                .then(function (buffer) {
                // get the buffer and make a blob to be saved
                var imgBlob = new Blob([buffer], {
                    type: "image/jpeg"
                });
                console.log(imgBlob.type, imgBlob.size);
                _this.blobImage = imgBlob;
                resolve({
                    fileName: fileName,
                    imgBlob: imgBlob
                });
            })
                .catch(function (e) { return reject(e); });
        });
    };
    /**
     *
     * @param _imageBlobInfo
     */
    UploadFileService.prototype.uploadToFirebase = function (_imageBlobInfo) {
        var _this = this;
        console.log("uploadToFirebase");
        return new Promise(function (resolve, reject) {
            var fileRef = __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]().ref("images/" + _imageBlobInfo.fileName);
            var uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
            uploadTask.on("state_changed", function (_snapshot) {
                _this.progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
                _this.progressStream.emit({ value: _this.progress });
                console.log("snapshot progess " + _this.progress);
            }, function (_error) {
                console.log(_error);
                reject(_error);
            }, function () {
                // completion...
                resolve(uploadTask.snapshot);
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], UploadFileService.prototype, "progress", void 0);
    UploadFileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]])
    ], UploadFileService);
    return UploadFileService;
}());

//# sourceMappingURL=UploadFileService.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UserInfoService__ = __webpack_require__(64);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__UserInfoService__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(472);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_register_register__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_profile_profile__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_addproduct_addproduct__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_detail_detail__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_ver_producto_ver_producto__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_create_product_create_product__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_service__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_sqlite_database_service__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_config_service__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_Firebase_FirebaseService__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_upload_file_UploadFileService__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_user_info_UserInfoService__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_storage__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_native_audio__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_youtube_video_player__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_path__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_streaming_media__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_camera__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_file__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_sqlite__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_sqlite_porter__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_image_picker__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_angularfire2__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_33_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_angularfire2_auth__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_34_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_angularfire2_database__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_35_angularfire2_database__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__services_Firebase_FirebaseConfig__ = __webpack_require__(605);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// Pages










// Components


// Services






// Plugins










// Firebase




var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_addproduct_addproduct__["a" /* AddproductPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_ver_producto_ver_producto__["a" /* VerProductoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_create_product_create_product__["a" /* CreateProductPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/create-product/create-product.module#CreateProductPageModule', name: 'CreateProductPage', segment: 'create-product', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                // Plugin
                __WEBPACK_IMPORTED_MODULE_23__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                // Firebase
                __WEBPACK_IMPORTED_MODULE_33_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_36__services_Firebase_FirebaseConfig__["a" /* firebaseConfig */].fire)
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_addproduct_addproduct__["a" /* AddproductPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_ver_producto_ver_producto__["a" /* VerProductoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_create_product_create_product__["a" /* CreateProductPage */],
            ],
            providers: [
                // Ours
                __WEBPACK_IMPORTED_MODULE_19__services_config_service__["a" /* ConfigService */],
                __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_18__services_sqlite_database_service__["a" /* SqliteDatabaseService */],
                __WEBPACK_IMPORTED_MODULE_20__services_Firebase_FirebaseService__["a" /* FirebaseService */],
                __WEBPACK_IMPORTED_MODULE_21__services_upload_file_UploadFileService__["a" /* UploadFileService */],
                __WEBPACK_IMPORTED_MODULE_22__services_user_info_UserInfoService__["a" /* UserInfoService */],
                // Ionic
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                // Plugin
                __WEBPACK_IMPORTED_MODULE_30__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_sqlite_porter__["a" /* SQLitePorter */],
                __WEBPACK_IMPORTED_MODULE_25__ionic_native_youtube_video_player__["a" /* YoutubeVideoPlayer */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_native_audio__["a" /* NativeAudio */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_file_path__["a" /* FilePath */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_streaming_media__["a" /* StreamingMedia */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_image_picker__["a" /* ImagePicker */],
                // Firebase
                __WEBPACK_IMPORTED_MODULE_34_angularfire2_auth__["AngularFireAuth"],
                __WEBPACK_IMPORTED_MODULE_35_angularfire2_database__["AngularFireDatabase"],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_sqlite_database_service__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_service__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, db, auth) {
        var _this = this;
        this.splashScreen = splashScreen;
        this.db = db;
        this.auth = auth;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        this.isReady = false;
        splashScreen.show();
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            _this.verifyPageToStart();
            _this.isReady = true;
            _this.splashScreen.hide();
        });
    }
    MyApp.prototype.ngOnInit = function () {
        var _this = this;
        // Not being used until varifyPageToStart is ready!
        var authStream = this.auth.authenticationStream.subscribe(function (data) {
            if (data.loggedIn) {
                // Start app
                _this.isReady = true;
                _this.splashScreen.hide();
            }
        });
    };
    MyApp.prototype.verifyPageToStart = function () {
        /// Not working yet.....
        // this.db.get('current-user-app').then(userEmail => {
        //   console.log('user stored email: ', userEmail);
        //   if (userEmail != undefined) {
        //     this.db.get(userEmail).then(password => {
        //       console.log('Password hash ', password);
        //       if (!!password) {
        //         this.auth.login(userEmail, password);
        //       }
        //     });
        //   }
        // });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], MyApp.prototype, "isReady", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/app/app.html"*/'<ion-nav *ngIf="isReady" [root]="rootPage">\n    \n</ion-nav>\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_5__services_sqlite_database_service__["a" /* SqliteDatabaseService */], __WEBPACK_IMPORTED_MODULE_6__services_auth_service__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__sqlite_database_service__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Firebase_FirebaseService__ = __webpack_require__(60);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthService = /** @class */ (function () {
    function AuthService(db, auth) {
        this.db = db;
        this.auth = auth;
        this.authenticationStream = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.registerStream = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    AuthService.prototype.login = function (username, password) {
        var _this = this;
        this.auth.loginWithUsernamePassword(username, password).then(function (result) {
            _this.isAuth = true;
            _this.userEmail = username;
            _this.db.add('current-user-app', _this.userEmail);
            _this.db.add(_this.userEmail, result.user.displayName);
            _this.authenticationStream.emit({
                username: username,
                password: password,
                errors: false,
                loggedIn: true
            });
        }).catch(function (err) {
            _this.authenticationStream.emit({
                username: username,
                password: password,
                errors: true,
                loggedIn: false
            });
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        this.auth.logout().then(function (result) {
            _this.isAuth = false;
            _this.db.remove('current-user-app');
            _this.db.remove(_this.userEmail);
            _this.userEmail = '';
            _this.authenticationStream.emit({
                loggedIn: false
            });
        });
    };
    AuthService.prototype.isAuthenticated = function () {
        return this.isAuth;
    };
    AuthService.prototype.getUserEmail = function () {
        return this.userEmail;
    };
    // getUsers(): AngularFireList<any> {
    //     //return this.auth.readAllUsers();
    // }
    AuthService.prototype.exists = function (email) {
        this.auth.existsPromise(email);
    };
    AuthService.prototype.register = function (user, addedKey) {
        var _this = this;
        this.auth.register(user.email, user.password).then(function (data) {
            _this.registerStream.emit({
                success: true,
            });
        }).catch(function (err) {
            _this.registerStream.emit({
                success: false,
                message: err.message
            });
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__sqlite_database_service__["a" /* SqliteDatabaseService */], __WEBPACK_IMPORTED_MODULE_2__Firebase_FirebaseService__["a" /* FirebaseService */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=AuthService.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqliteDatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(316);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SqliteDatabaseService = /** @class */ (function () {
    function SqliteDatabaseService(storage) {
        this.storage = storage;
        this.addedValue = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.removedValue = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    SqliteDatabaseService.prototype.add = function (key, value) {
        if (!!key) {
            this.storage.set(key, value);
            this.addedValue.emit({ key: key, value: value });
        }
    };
    SqliteDatabaseService.prototype.remove = function (key) {
        var _this = this;
        if (!!key) {
            this.storage.get(key).then(function (value) {
                _this.storage.remove(key);
                _this.removedValue.emit({ key: key, value: value });
            });
        }
    };
    SqliteDatabaseService.prototype.update = function (key, newValue) {
        var _this = this;
        if (!!key) {
            this.storage.get(key).then(function (item) {
                if (!!item && item !== newValue) {
                    _this.storage.set(key, newValue);
                }
            });
        }
    };
    SqliteDatabaseService.prototype.get = function (key) {
        if (!!key) {
            return this.storage.get(key);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], SqliteDatabaseService.prototype, "addedValue", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], SqliteDatabaseService.prototype, "removedValue", void 0);
    SqliteDatabaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], SqliteDatabaseService);
    return SqliteDatabaseService;
}());

//# sourceMappingURL=SqliteDatabaseService.js.map

/***/ }),

/***/ 586:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(346);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfigService = /** @class */ (function () {
    function ConfigService(http) {
        this.http = http;
    }
    ConfigService.prototype.getJSON = function () {
        return this.http.get("./assets/recipes.json");
    };
    ConfigService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ConfigService);
    return ConfigService;
}());

//# sourceMappingURL=ConfigService.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AuthService__ = __webpack_require__(522);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__AuthService__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__UploadFileService__ = __webpack_require__(348);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__UploadFileService__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FirebaseService = /** @class */ (function () {
    function FirebaseService(auth, db) {
        this.auth = auth;
        this.db = db;
    }
    FirebaseService.prototype.ngOnInit = function () {
        console.log(this.db);
        this.users$ = this.db.list("/users");
    };
    FirebaseService.prototype.loginWithUsernamePassword = function (username, password) {
        return this.auth.auth.signInWithEmailAndPassword(username, password);
    };
    FirebaseService.prototype.existsPromise = function (email) {
        return this.auth.auth.fetchProvidersForEmail(email);
    };
    FirebaseService.prototype.logout = function () {
        return this.auth.auth.signOut();
    };
    FirebaseService.prototype.readAllUsers = function () {
        return this.db.list("/users").valueChanges();
    };
    FirebaseService.prototype.removeProviderFromUserWatchersList = function (watcherEmail, providerEmail, watcherDocId, providerDocId) {
        var user = this.db.object("/users/" + watcherDocId);
        var provider = this.db.object("/users/" + providerDocId);
        // GET curretn watchers list
        var currentWatchers = [];
        var providerCurrentWatchers = [];
        var userCurrentWatchersFetched = false;
        var providerCurrentWatchersFetched = false;
        user.valueChanges().subscribe(function (data) {
            currentWatchers = (!!data.watchers) ? data.watchers : [];
            if (!userCurrentWatchersFetched) {
                currentWatchers = currentWatchers.filter(function (x) { return x !== providerEmail; });
                user.update({
                    watchers: currentWatchers.slice()
                });
            }
            userCurrentWatchersFetched = true;
        });
        provider.valueChanges().subscribe(function (data) {
            providerCurrentWatchers = (!!data.watchers) ? data.watchers : [];
            if (!providerCurrentWatchersFetched) {
                providerCurrentWatchers = providerCurrentWatchers.filter(function (x) { return x !== watcherEmail; });
                provider.update({
                    watchers: providerCurrentWatchers.slice()
                });
            }
            providerCurrentWatchersFetched = true;
        });
    };
    FirebaseService.prototype.addProviderToUserWatchersList = function (watcherEmail, providerEmail, watcherDocId, providerDocId) {
        var user = this.db.object("/users/" + watcherDocId);
        var provider = this.db.object("/users/" + providerDocId);
        // GET current watchers list
        var userCurrentWatchers = [];
        var providerCurrentWatchers = [];
        var userCurrentWatchersFetched = false;
        var providerCurrentWatchersFetched = false;
        user.valueChanges().subscribe(function (data) {
            userCurrentWatchers = (!!data.watchers) ? data.watchers : [];
            if (!userCurrentWatchersFetched) {
                user.update({
                    watchers: userCurrentWatchers.concat([providerEmail])
                });
            }
            userCurrentWatchersFetched = true;
        });
        provider.valueChanges().subscribe(function (data) {
            providerCurrentWatchers = (!!data.watchers) ? data.watchers : [];
            if (!providerCurrentWatchersFetched) {
                provider.update({
                    watchers: providerCurrentWatchers.concat([watcherEmail])
                });
            }
            providerCurrentWatchersFetched = true;
        });
    };
    FirebaseService.prototype.createPushId = function () {
        return this.db.createPushId();
    };
    FirebaseService.prototype.register = function (email, password) {
        return this.auth.auth.createUserWithEmailAndPassword(email, password);
    };
    FirebaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["AngularFireDatabase"]])
    ], FirebaseService);
    return FirebaseService;
}());

//# sourceMappingURL=FirebaseService.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VerProductoPage = /** @class */ (function () {
    function VerProductoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.items = [
            {
                url: "https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg",
                title: "Cocoa nestle",
                description: "Un producto para pasarla en familia."
            },
            {
                url: "https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg",
                title: "Cocoa nestle",
                description: "Un producto para pasarla en familia."
            },
            {
                url: "https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg",
                title: "Cocoa nestle",
                description: "Un producto para pasarla en familia."
            },
            {
                url: "https://cdn.shopify.com/s/files/1/2362/7179/products/Nestle_Cocoa_Instant_Powder_180_grams_2048x.jpg",
                title: "Cocoa nestle",
                description: "Un producto para pasarla en familia."
            }
        ];
    }
    VerProductoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/travis/build/leinadpb/provisio/src/pages/ver-producto/ver-producto.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n    <ion-title>Productos</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let item of items">\n      <ion-avatar item-start>\n        <img [src]="item.url">\n      </ion-avatar>\n      <h2>{{item.title}}</h2>\n      <p>{{item.description}}</p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/travis/build/leinadpb/provisio/src/pages/ver-producto/ver-producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], VerProductoPage);
    return VerProductoPage;
}());

//# sourceMappingURL=ver-producto.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    fire: {
        apiKey: "AIzaSyACAYCpYfO_gCK6G3s1mWOi_WAWL-GSbqo",
        authDomain: "recipes-bac62.firebaseapp.com",
        databaseURL: "https://provisio.firebaseio.com",
        projectId: "recipes-bac62",
        storageBucket: "recipes-bac62.appspot.com",
        messagingSenderId: "772796889514"
    }
};
//# sourceMappingURL=FirebaseConfig.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserInfoService = /** @class */ (function () {
    function UserInfoService() {
    }
    UserInfoService.prototype.reset = function () {
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
    };
    UserInfoService.prototype.addWatcher = function (user, addedKey) {
        this.reset();
        this.docId = !!user.docId ? user.docId : addedKey;
        this.name = user.name;
        this.lastname = user.lastname;
        this.email = user.email;
        this.watchers = user.watchers;
        this.imageUrl = user.imageUrl;
        this.type = user.userType;
    };
    UserInfoService.prototype.addProvider = function (user, addedKey) {
        this.reset();
        this.docId = !!user.docId ? user.docId : addedKey;
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
    };
    UserInfoService.prototype.addUser = function (email, name) {
        this.reset();
        this.email = email;
        this.name = name;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "type", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "email", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Array)
    ], UserInfoService.prototype, "watchers", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], UserInfoService.prototype, "docId", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "lastname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "imageUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "motto", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "phone", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "address", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "videoUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "audioUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "logoUrl", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], UserInfoService.prototype, "watchingCount", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], UserInfoService.prototype, "website", void 0);
    UserInfoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], UserInfoService);
    return UserInfoService;
}());

//# sourceMappingURL=UserInfoService.js.map

/***/ })

},[352]);
//# sourceMappingURL=main.js.map