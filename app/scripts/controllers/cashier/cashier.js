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
        $scope.listOrders = [];

        $scope.clearOrder = function () {
            $scope.order = {};
            $scope.order.customerNumber = 1;
            $scope.order.foods = [];
            $scope.order.discounts = [];
            $scope.order.taxes = [];
            $scope.order.total = 0;
        };

        var _init = function () {
            $scope.clearOrder();
            if (!localStorageService.get('orders')) {
                localStorageService.set('orders', [])
            }
            $scope.listOrders = localStorageService.get('orders');
            console.log($scope.listOrders)
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
        };

        $scope.selectTableOrder = function (item) {
            $scope.order.table = item;
        };

        $scope.createOrder = function () {
            $scope.order.id = orders.length;
            $scope.listOrders.push($scope.order);
            localStorageService.set('orders', $scope.listOrders)
        };

        $scope.addDiscount = function (discount) {
            if (!OrderService.checkDiscountTax(discount, $scope.order.discounts)) {
                $scope.order.discounts.push(discount);
                $scope.order = OrderService.totalOrder($scope.order);
            }
        };

        $scope.deleteTax = function (index) {
            $scope.order.taxes.splice(index, 1);
            $scope.order = OrderService.totalOrder($scope.order);
        };

        $scope.deleteDiscount = function (index) {
            $scope.order.discounts.splice(index, 1);
            $scope.order = OrderService.totalOrder($scope.order);
        };

        $scope.addTax = function (tax) {
            if (!OrderService.checkDiscountTax(tax, $scope.order.taxes)) {
                $scope.order.taxes.push(tax);
                $scope.order = OrderService.totalOrder($scope.order);
            }
        };

        $scope.createOrder = function () {
            $scope.order.status = 1;
            $scope.listOrders.push($scope.order);
            localStorageService.set('orders', $scope.listOrders);
        };

        $scope.selectedOrder = function (item, index) {
            $scope.order = angular.copy(item);
            $scope.order.index = index;
        };

        _init();

    });
