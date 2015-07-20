'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierTableCtrl
 * @description
 * # CashierTableCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
    .controller('CashierTableCtrl', function ($scope, TableService) {
        $scope.listTables = [];
        $scope.table = {};

        $scope.getTables = function () {
            TableService.getTables().then(function(data){
                $scope.listTables = data;
                $scope.table = data[0];
            }, function(err){
              console.log(err);
            });
        };

        $scope.selectTables = function (table) {
            $scope.table = table;
        };

        var _init = function () {
            $scope.getTables();
        };

        _init();
    });
