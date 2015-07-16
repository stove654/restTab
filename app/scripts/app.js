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
        'LocalStorageModule',
        'ui.bootstrap',
        'config'
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
                    && toState.name !== 'admin.menu' ;
                return;
            }

            if(SessionService.isToken().isLoggedIn && localStorageService.get('user').role == 1) {
                var shouldGoToMain = fromState.name === ''
                    && toState.name !== 'cashier' ;
                return;
            }

        });
    })

    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
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
            .state('admin.menu', {
                url: "/menu",
                views: {
                    'menuAdminContent' :{
                        templateUrl: "views/admin/admin_menu.html",
                        controller: 'AdminMenuCtrl',
                    }
                },
                data : {requireLogin : true }
            })
            .state('cashier', {
                url: "/cashier",
                templateUrl: "views/cashier/cashier.html",
                controller: 'CashierCtrl',
                data : {requireLogin : true }
            })

        $urlRouterProvider.otherwise("/login");

        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
        $httpProvider.defaults.headers.common['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'];
        $httpProvider.interceptors.push('loaderInterceptor');
        $ionicConfigProvider.views.transition('none');
    })

    .factory('loaderInterceptor', function($rootScope, $q, $location, localStorageService, $injector) {
        return {
            'responseError' : function(response){

                if (response.status == 401) {
                    var state = $injector.get('$state');
                    localStorageService.set('user', {});
                    state.go('login');
                }
                return $q.reject(response);
            }
        };
    })

    //Config languages
    .config(function($translateProvider) {
        $translateProvider
            .translations('en', {
                EMAIL_ADDRESS: 'Email address',
                PASSWORD: 'Password',
                LOGIN: 'Login',
                REGISTER_ADMIN: 'Register',
                ADMIN: 'Admin',
                MENU: 'Menu'
            })
            .translations('vi', {
                EMAIL_ADDRESS: 'Địa chỉ email',
                PASSWORD: 'Mật khẩu',
                LOGIN: 'Đăng nhập',
                REGISTER_ADMIN: 'Đăng ký',
                ADMIN: 'Quản trị',
                MENU: 'Menu'
            });
        $translateProvider.preferredLanguage('vi');
    })

    .controller('AppCtrl', function ($scope, SessionService) {
        SessionService.isToken();
    });
