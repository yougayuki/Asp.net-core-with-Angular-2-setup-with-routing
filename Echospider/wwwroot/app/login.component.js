System.register(["@angular/core", "@angular/router", "./services/authentication.service"], function (exports_1, context_1) {
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
    var core_1, router_1, authentication_service_1, LoginComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (authentication_service_1_1) {
                authentication_service_1 = authentication_service_1_1;
            }
        ],
        execute: function () {
            LoginComponent = (function () {
                function LoginComponent(route, router, authenticationService) {
                    this.route = route;
                    this.router = router;
                    this.authenticationService = authenticationService;
                    this.model = {};
                    this.loading = false;
                    this.error = '';
                }
                LoginComponent.prototype.ngOnInit = function () {
                    // reset login status
                    //if (this.authenticationService.loggedIn) {
                    this.authenticationService.logout();
                    //this.router.navigate(['/home']);
                    // get return url from route parameters or default to '/'
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
                    console.log("returnUrl: " + this.returnUrl);
                    //}
                };
                LoginComponent.prototype.login = function () {
                    var _this = this;
                    //console.log(this.model.username + " " + this.model.password);
                    this.loading = true;
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
                    console.log("returnUrl: " + this.returnUrl);
                    this.authenticationService.login(this.model.username, this.model.password)
                        .subscribe(function (result) {
                        if (result === true) {
                            // login successful
                            //this.router.navigate(['/home']);
                            //this.router.navigate([this.returnUrl]);
                            window.location.href = '/login';
                        }
                        else {
                            // login failed
                            _this.error = 'Username or password is incorrect';
                            _this.loading = false;
                        }
                    });
                };
                return LoginComponent;
            }());
            LoginComponent = __decorate([
                core_1.Component({
                    //moduleId: module.id,
                    selector: 'login',
                    templateUrl: './app/login.component.html'
                }),
                __metadata("design:paramtypes", [router_1.ActivatedRoute,
                    router_1.Router,
                    authentication_service_1.AuthenticationService])
            ], LoginComponent);
            exports_1("LoginComponent", LoginComponent);
        }
    };
});
//# sourceMappingURL=login.component.js.map