'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierCtrl
 * @description
 * # CashierCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
    .controller('CashierCtrl', function ($scope, localStorageService, OrderService, $state, toaster, $translate, $modal) {

        $scope.user = {};
        $scope.user = localStorageService.get('user');
        $scope.order = {};
        $scope.listOrders = [];
        $scope.state = $state.current.url;
        console.log($state);

        var toasterMessage = {};

        $translate('NO_TABLE').then(function (translation) {
            toasterMessage.errorTable = translation;
        });

        $scope.clearOrder = function () {
            $scope.order = {};
            $scope.order.customerNumber = 1;
            $scope.order.foods = [];
            $scope.order.discounts = [];
            $scope.order.taxes = [];
            $scope.order.total = 0;
            $scope.order.isConfirm = false;
            $scope.order.paymentMethod = 1;
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
          $scope.order.isConfirm = true;
          $scope.order = OrderService.totalOrder($scope.order);
        };

        $scope.selectTableOrder = function (item) {
            $scope.order.table = item;
            $scope.order.isConfirm = true;
        };

        $scope.addDiscount = function (discount) {
            if (!OrderService.checkDiscountTax(discount, $scope.order.discounts)) {
                $scope.order.discounts.push(discount);
                $scope.order = OrderService.totalOrder($scope.order);
                $scope.order.isConfirm = true;
            }
        };

        $scope.deleteTax = function (index) {
            $scope.order.taxes.splice(index, 1);
            $scope.order = OrderService.totalOrder($scope.order);
            $scope.order.isConfirm = true;
        };

        $scope.deleteDiscount = function (index) {
            $scope.order.discounts.splice(index, 1);
            $scope.order = OrderService.totalOrder($scope.order);
            $scope.order.isConfirm = true;
        };

        $scope.addTax = function (tax) {
            if (!OrderService.checkDiscountTax(tax, $scope.order.taxes)) {
                $scope.order.taxes.push(tax);
                $scope.order = OrderService.totalOrder($scope.order);
                $scope.order.isConfirm = true;
            }
        };

        $scope.createOrder = function () {
            if ($scope.order.table) {
                $scope.order.status = 1;
                $scope.order.id =  $scope.listOrders.length;
                $scope.order.staff = angular.copy($scope.user);
                $scope.order.staff.password = '';
                $scope.order.creatAt = new Date();
                $scope.order.updateAt = new Date();
                $scope.order.isConfirm = false;
                $scope.listOrders.push($scope.order);
                localStorageService.set('orders', $scope.listOrders);
            } else {
                $state.go('cashier.table');
                toaster.pop('warning', toasterMessage.errorTable);
            }
        };

        $scope.selectedOrder = function (item, index) {
            if (index != $scope.order.index) {
                $scope.order = angular.copy(item);
                $scope.order.index = index;
            } else {
                $scope.clearOrder();
            }
        };

        $scope.subCustomerNumber = function () {
            if ($scope.order.customerNumber) {
                $scope.order.customerNumber --;
            }
        };

        $scope.addCustomerNumber = function () {
            $scope.order.customerNumber ++;
            $scope.order.isConfirm = true;
        };

        $scope.goOrder = function () {
            $scope.clearOrder();
            $state.go('cashier.menu')
        };

        $scope.editFood = function (data, index) {
          data.isEdit = true;
          var food = angular.copy(data);
          food.quantity = 1;
          food.index = index;
          var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'views/cashier/modal/food.html',
            controller: 'CashierFoodCtrl',
            size: 'md',
            windowClass: 'default-modal',
            scope: $scope,
            resolve: {
              food: function () {
                return food;
              }
            }
          });

          modalInstance.result.then(function (food) {
            $scope.order.foods[index] = food;
            $scope.order.isConfirm = true;
            $scope.order = OrderService.totalOrder($scope.order);
          }, function () {

          });
        };

        $scope.deleteFood = function (data) {
          $scope.order.foods.splice(data.index, 1);
          $scope.order.isConfirm = true;
          $scope.order = OrderService.totalOrder($scope.order);
        };

        $scope.resendOrder = function () {
          $scope.order.isConfirm = false;
          $scope.listOrders[$scope.order.index] = angular.copy($scope.order);
          localStorageService.set('orders', $scope.listOrders);
        };

        $scope.$on('$stateChangeStart', function(event, toState) {
            $scope.state = toState.url;
            if ($scope.state == '/calculator') {
                $scope.order.paymentMethod = 1;
            }
        });

        $scope.paymentMeThod = function (number) {
          $scope.order.paymentMethod = number;
        };

        _init();

    });
