System.register(["@angular/core", "@angular/http", "rxjs/add/operator/map"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, http_1, AuthenticationService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            AuthenticationService = (function () {
                function AuthenticationService(http) {
                    this.http = http;
                    // set token if saved in local storage
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    if (currentUser != null) {
                        this.token = currentUser.token;
                        this.loggedIn = true;
                    }
                }
                AuthenticationService.prototype.login = function (username, password) {
                    var _this = this;
                    //console.log("username:" + username + " password:" + password);
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    var options = new http_1.RequestOptions({ headers: headers });
                    var body = new http_1.URLSearchParams();
                    body.set('username', username);
                    body.set('password', password);
                    //let body = JSON.stringify({ username: username, password: password });
                    //var headers = new Headers();
                    //headers.append('Content-Type', 'application/json');
                    return this.http.post('/api/user/authenticate', body, headers)
                        .map(function (response) {
                        // login successful if there's a jwt token in the response
                        var access_token = response.json() && response.json().access_token;
                        var expires_in = response.json() && response.json().access_token;
                        if (access_token) {
                            // set token property
                            _this.token = access_token;
                            _this.loggedIn = true;
                            // store username and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify({ username: username, token: access_token, expires_in: expires_in }));
                            // return true to indicate successful login
                            return true;
                        }
                        else {
                            // return false to indicate failed login
                            _this.loggedIn = false;
                            return false;
                        }
                    });
                };
                AuthenticationService.prototype.logout = function () {
                    // clear token remove user from local storage to log user out
                    this.token = null;
                    this.loggedIn = false;
                    if (localStorage.length > 0) {
                        if (localStorage.getItem("currentUser")) {
                            localStorage.removeItem('currentUser');
                        }
                    }
                };
                return AuthenticationService;
            }());
            AuthenticationService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], AuthenticationService);
            exports_1("AuthenticationService", AuthenticationService);
        }
    };
});
//# sourceMappingURL=authentication.service.js.map