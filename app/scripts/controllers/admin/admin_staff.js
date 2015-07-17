
'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:StaffMenuCtrl
 * @description
 * # StaffMenuCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
  .controller('StaffMenuCtrl', function ($scope, UsersService) {

        $scope.listRoles = [
            {
                name: 'Admin',
                role: 0
            },
            {
                name: 'Manager',
                role: 1
            },
            {
                name: 'Accountant',
                role: 2
            },
            {
                name: 'Cashier',
                role: 3
            },
            {
                name: 'Waiter',
                role: 4
            },
            {
                name: 'Bar',
                role: 5
            }

        ];

        $scope.staff = {};

        $scope.listStaffs = [];

        $scope.selectRole = function (role) {
            $scope.staff.role = role;
            $scope.staff.roleText = $scope.listRoles[role].name;
        };

        $scope.addStaff = function () {
            var data = {
                name: $scope.staff.name,
                email: $scope.staff.email,
                password: $scope.staff.password,
                role: $scope.staff.role,
                roleText: $scope.staff.roleText
            };

            UsersService.addUserAdmin(data).then(function(){
                _init();
                $scope.staff = {};
            }, function(err){
                console.log(err);
            });
        };

        var _init = function () {
            UsersService.getUsers().then(function(data){
                $scope.listStaffs = data;
                console.log($scope.listStaffs)
            }, function(err){
                console.log(err);
            });
        };
        _init();
  });
