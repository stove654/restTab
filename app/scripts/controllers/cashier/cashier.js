'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierCtrl
 * @description
 * # CashierCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
    .controller('CashierCtrl', function ($scope, localStorageService, OrderService) {

        $scope.user = {};
        $scope.user = localStorageService.get('user');
        $scope.order = {};
        var orders = [];

        $scope.clearOrder = function () {
            $scope.order = {};
            $scope.order.customerNumber = 1;
            $scope.order.foods = [];
            $scope.order.total = 0;
        };

        var _init = function () {
            $scope.clearOrder();
            if (!localStorageService.get('orders')) {
                localStorageService.set('orders', [])
            }
            orders = localStorageService.get('orders');
        };

        $scope.addFoodOrder = function (data) {
            var checkCustomId = false;
            for (var i = 0; i < $scope.order.foods.length; i++) {
                if (data.customId == $scope.order.foods[i].customId) {
                    $scope.order.foods[i].quantity += data.quantity;
                    checkCustomId = true;
                    break;
                }
            }
            if (!checkCustomId) {
                $scope.order.foods.push(data);
            }
            $scope.order = OrderService.totalOrder($scope.order);
                console.log($scope.order)
        };

        $scope.selectTableOrder = function (item) {
            $scope.order.table = item;
        };

        $scope.createOrder = function () {
            $scope.order.id = orders.length;
            orders.push($scope.order);
            localStorageService.set('orders', orders)
        };

        _init();

    });
