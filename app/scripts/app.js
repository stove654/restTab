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
        'config',
        'ui.utils.masks',
        'angularMoment',
        'toaster'
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

            if(SessionService.isToken().isLoggedIn && localStorageService.get('user').role == 3) {
                var shouldGoToMain = fromState.name === ''
                    && toState.name !== 'cashier.main' ;
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
                        controller: 'AdminMenuCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('admin.staff', {
                url: "/staff",
                views: {
                    'menuAdminContent' :{
                        templateUrl: "views/admin/admin_staff.html",
                        controller: 'StaffMenuCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('admin.taxes', {
                url: "/taxes",
                views: {
                    'menuAdminContent' :{
                        templateUrl: "views/admin/admin_taxes.html",
                        controller: 'TaxesCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('admin.discounts', {
                url: "/discounts",
                views: {
                    'menuAdminContent' :{
                        templateUrl: "views/admin/admin_discounts.html",
                        controller: 'DiscountsCtrl'
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
            .state('cashier.main', {
                url: "/main",
                views: {
                    'menuCashierContent' :{
                        templateUrl: "views/cashier/cashier_main.html",
                        controller: 'CashierMainCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('cashier.menu', {
                url: "/menu",
                views: {
                    'menuCashierContent' :{
                        templateUrl: "views/cashier/cashier_menu.html",
                        controller: 'CashierMenuCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('cashier.table', {
                url: "/table",
                views: {
                    'menuCashierContent' :{
                        templateUrl: "views/cashier/cashier_table.html",
                        controller: 'CashierTableCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('cashier.taxes', {
                url: "/taxes",
                views: {
                    'menuCashierContent' :{
                        templateUrl: "views/cashier/cashier_taxes.html",
                        controller: 'TaxesCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('cashier.discounts', {
                url: "/discounts",
                views: {
                    'menuCashierContent' :{
                        templateUrl: "views/cashier/cashier_discounts.html",
                        controller: 'DiscountsCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('cashier.orders', {
                url: "/orders",
                views: {
                    'menuCashierContent' :{
                        templateUrl: "views/cashier/cashier_orders.html",
                        controller: 'CashierOrdersCtrl'
                    }
                },
                data : {requireLogin : true }
            })
            .state('cashier.calculator', {
                url: "/calculator",
                views: {
                    'menuCashierContent' :{
                        templateUrl: "views/cashier/cashier_calculator.html",
                        controller: 'CashierCalculatorCtrl'
                    }
                },
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
                MENU: 'Menu',
                NAME_CATEGORY: 'Name category',
                STAFF: 'Staff manager',
                FULL_NAME: 'Full name',
                EMAIL: 'Email',
                ROLE: 'Role',
                ADD: 'Add',
                MANAGER: 'Manager',
                CASHIER: 'Cashier',
                WAITER: 'Waiter',
                BAR: 'Bar',
                ACCOUNTANT: 'Accountant',
                COLS: 'Cols',
                SORT_BY: 'Sort by',
                NAME: 'Name',
                DATE: 'Date',
                SEARCH_FOOD: 'Search food',
                CANCEL: 'Cancel',
                NOTE: 'Note',
                TABLE: 'Table',
                CREATE_NEW_ORDER: 'Create new order',
                PRINT: 'Print',
                TAXES: 'Taxes',
                DISCOUNTS: 'Discounts',
                AMOUNT: 'Amount',
                RATE: 'Rate',
                TOTAL: 'Total',
                TOTAL_TAXES: 'Total taxes',
                TOTAL_DISCOUNTS: 'Total discounts',
                RESEND: 'Resend',
                RUNNING: 'Running',
                TAB_CREATE: 'Tab <i class="mdi mdi-library-plus"></i> to create new order',
                OR: 'or',
                TAB_SELECT: 'Tab <i class="mdi mdi-basket"></i> to see orders',
                WITHDRAW: 'Withdraw',
                DEPOSIT: 'Deposit',
                BALANCE: 'Balance',
                NO_TABLE: 'Not selected table',
                TENDER: 'Tender',
                CHANGE_MONEY: 'Change',
                UPDATE: 'Update',
                DELETE: 'Delete',
                CASH: 'Cash',
                CARD: 'Card',
                HOLD: 'hold',
            })
            .translations('vi', {
                EMAIL_ADDRESS: 'Địa chỉ email',
                PASSWORD: 'Mật khẩu',
                LOGIN: 'Đăng nhập',
                REGISTER_ADMIN: 'Đăng ký',
                ADMIN: 'Quản trị',
                MENU: 'Menu',
                NAME_CATEGORY: 'Tên category',
                STAFF: 'Quản lý nhân viên',
                FULL_NAME: 'Tên đầy đủ',
                EMAIL: 'Email',
                ROLE: 'Chức vụ',
                ADD: 'Thêm',
                MANAGER: 'Quản lý',
                CASHIER: 'Thu ngân',
                WAITER: 'Phục vụ',
                BAR: 'Nhân viên bar',
                ACCOUNTANT: 'Kế toán',
                COLS: 'Số cột',
                SORT_BY: 'Sắp xếp theo',
                NAME: 'Tên',
                DATE: 'Ngày',
                SEARCH_FOOD: 'Tìm món',
                CANCEL: 'Hủy',
                NOTE: 'Ghi chú',
                TABLE: 'Bàn',
                CREATE_NEW_ORDER: 'Tạo order mới',
                PRINT: 'In',
                TAXES: 'Thuế',
                DISCOUNTS: 'Giảm giá',
                AMOUNT: 'Tiền',
                RATE: 'Phần trăm',
                TOTAL: 'Tổng tiền',
                TOTAL_TAXES: 'Tổng tiền thuế',
                TOTAL_DISCOUNTS: 'Tổng tiền giảm giá',
                RESEND: 'Gửi lại',
                RUNNING: 'Đang hoạt động',
                TAB_CREATE: 'Chọn <i class="mdi mdi-library-plus"></i> để tạo mới order',
                OR: 'hoặc',
                TAB_SELECT: 'Chọn <i class="mdi mdi-basket"></i> để xem danh sách orders',
                WITHDRAW: 'Rút tiền',
                DEPOSIT: 'Gửi tiền',
                BALANCE: 'Số dư',
                NO_TABLE: 'Chưa chọn bàn',
                TENDER: 'Khách đưa',
                CHANGE_MONEY: 'Trả lại',
                UPDATE: 'Cập nhật',
                DELETE: 'Xóa',
                CASH: 'Tiền mặt',
                CARD: 'Thẻ',
                HOLD: 'Nợ',
            });
        $translateProvider.preferredLanguage('vi');
    })

    .controller('AppCtrl', function ($scope, SessionService) {
        SessionService.isToken();
    });
