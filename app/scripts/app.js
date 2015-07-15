'use strict';

/**
 * @ngdoc overview
 * @name restTabApp
 * @description
 * # restTabApp
 *
 * Main module of the application.
 */
angular
  .module('restTabApp', [
        'ionic',
        'pascalprecht.translate',
        'LocalStorageModule'
    ])

    .run(function ($rootScope, $state, $location, SessionService, localStorageService) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            var shouldLogin = toState.data !== undefined
                && toState.data.requireLogin
                && !SessionService.isToken().isLoggedIn ;

            // NOT authenticated - wants any private stuff
            if(shouldLogin)
            {
                $state.go('login');
                event.preventDefault();
                return;
            }

            // authenticated (previously) comming not to root main
            if(SessionService.isToken().isLoggedIn && localStorageService.get('user').role == 0) {
                var shouldGoToMain = fromState.name === ''
                    && toState.name !== 'admin' ;
                return;
            }

            if(SessionService.isToken().isLoggedIn && localStorageService.get('user').role == 1) {
                var shouldGoToMain = fromState.name === ''
                    && toState.name !== 'cashier' ;
                return;
            }

        });
    })

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.navBar.transition('none');
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: 'LoginCtrl'
            })
            .state('admin', {
                url: "/admin",
                templateUrl: "views/admin/admin.html",
                controller: 'AdminCtrl',
                data : {requireLogin : true }
            })
            .state('cashier', {
                url: "/cashier",
                templateUrl: "views/cashier/cashier.html",
                controller: 'CashierCtrl',
                data : {requireLogin : true }
            })

        $urlRouterProvider.otherwise("/login");
    })

    //Config languages
    .config(function($translateProvider) {
        $translateProvider
            .translations('en', {
                EMAIL_ADDRESS: 'Email address',
                PASSWORD: 'Password',
                LOGIN: 'Login',
                REGISTER_ADMIN: 'Register',
            })
            .translations('vi', {
                EMAIL_ADDRESS: 'Địa chỉ email',
                PASSWORD: 'Mật khẩu',
                LOGIN: 'Đăng nhập',
                REGISTER_ADMIN: 'Đăng ký'
            });
        $translateProvider.preferredLanguage('vi');
    })

    .controller('AppCtrl', function ($scope, SessionService) {
        SessionService.isToken();
    });
