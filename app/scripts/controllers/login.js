'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')

    .controller('LoginCtrl', function ($scope, UsersService, $state, localStorageService) {

        $scope.users = [];
        $scope.admin = {};
        $scope.user = {};
        $scope.numberForm = Array.apply(null, {length: 9}).map(Number.call, Number);
        $scope.error = {};

        $scope.refreshList = function(){
            UsersService.getUsers().then(function(data){
                $scope.users = data;
                console.log($scope.users)
            }, function(err){
                console.log(err);
            });
        };

        $scope.addUserAdmin = function(){
            var data = {
              name: '',
              email: $scope.admin.email,
              password: $scope.admin.password,
              role: 0,
              roleText: 'Cashier'
            };

            UsersService.addUserAdmin(data).then(function(){
              $scope.refreshList();
            }, function(err){
              console.log(err);
            });
        };

        $scope.selectUser = function (user) {
            user.password = '';
            $scope.user = user;
            console.log($scope.user);
        };

        $scope.login = function () {
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.user.id == $scope.users[i].id && $scope.user.password == $scope.users[i].password) {
                    localStorageService.set('user', $scope.user);
                    if ($scope.user.role == 0) {
                        $state.go('admin.menu');
                    }
                    if ($scope.user.role == 1) {
                        $state.go('cashier');
                    }
                    break;
                }
            }
            $scope.error.message = true;
        };

        function init(){
            $scope.refreshList();
        }

        init();

        var keyBoard = function(e){
            var number;
            switch(e.keyCode) {
                case 8:
                    e.preventDefault();
                    $scope.$apply($scope.backConfirmPass());
                    break;
                case 48:
                    number = 0;
                    break;
                case 49:
                    number = 1;
                    break;
                case 50:
                    number = 2;
                    break;
                case 51:
                    number = 3;
                    break;
                case 52:
                    number = 4;
                    break;
                case 53:
                    number = 5;
                    break;
                case 54:
                    number = 6;
                    break;
                case 55:
                    number = 7;
                    break;
                case 56:
                    number = 8;
                    break;
                case 57:
                    number = 9;
                    break;
                case 96:
                    number = 0;
                    break;
                case 97:
                    number = 1;
                    break;
                case 98:
                    number = 2;
                    break;
                case 99:
                    number = 3;
                    break;
                case 100:
                    number = 4;
                    break;
                case 101:
                    number = 5;
                    break;
                case 102:
                    number = 6;
                    break;
                case 103:
                    number = 7;
                    break;
                case 104:
                    number = 8;
                    break;
                case 105:
                    number = 9;
                    break;
            }
            if (number >= 0 && $scope.user.email) {
                e.preventDefault();
                $scope.$apply($scope.addNumber(number));
            }
          /*  if (e.keyCode == 13 && $scope.data.credentials.email) {
                $scope.$apply($scope.login());
            }*/
        };
        window.addEventListener("keydown", keyBoard);

        $scope.addNumber = function (number) {
            number = JSON.stringify(number);
            $scope.user.password += number;
        };

        $scope.backConfirmPass = function () {
            if ($scope.user.password.length) {
                $scope.user.password = $scope.user.password.substring(0, $scope.user.password.length - 1);
            }
        };

        $scope.clearConfirmPass = function () {
            $scope.user.password = '';
        };

        $scope.backListUsers = function () {
            $scope.user = {};
        };

        $scope.$on('$destroy', function iVeBeenDismissed() {
            window.removeEventListener("keydown", keyBoard);
        })
  });
