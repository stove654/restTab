'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierCalculatorCtrl
 * @description
 * # CashierCalculatorCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
  .controller('CashierCalculatorCtrl', function ($scope, MathNumber, OrderService) {

      $scope.dataCalculator = {};

      $scope.addNumber = function (number) {
        if ($scope.dataCalculator.tender < 100000000000) {
          $scope.dataCalculator.tender = $scope.dataCalculator.tender * 100;
          $scope.dataCalculator.tender = MathNumber.mathNumber($scope.dataCalculator.tender);
          $scope.dataCalculator.tender = $scope.dataCalculator.tender.toString();
          $scope.dataCalculator.tender = $scope.dataCalculator.tender + number;
          $scope.dataCalculator.tender = parseFloat($scope.dataCalculator.tender);
          $scope.dataCalculator.tender = $scope.dataCalculator.tender/100;
          if ($scope.order.total) {
            $scope.dataCalculator.change = $scope.dataCalculator.tender - $scope.order.total;
          }
        }
      };

      $scope.backSpaceCalculator = function () {
            $scope.dataCalculator.tender = $scope.dataCalculator.tender.toString();
            $scope.dataCalculator.tender = $scope.dataCalculator.tender.substring(0, $scope.dataCalculator.tender.length - 1);
            $scope.dataCalculator.tender = parseFloat($scope.dataCalculator.tender);
            $scope.dataCalculator.change = $scope.dataCalculator.tender - $scope.order.total;
            if (!$scope.dataCalculator.tender) {
                $scope.dataCalculator.tender = 0;
            }
      };

      $scope.keyBoardClear = function () {
            $scope.clearCalculator();
      };

      $scope.keyBoardConfirm = function () {
          var params = angular.copy($scope.order);
          params.tender = $scope.dataCalculator.tender;
          params.change = $scope.dataCalculator.change;
          OrderService.paymentOrder(params).then(function(data){
              $scope.deleteOrder();
              $scope.clearCalculator();
          }, function(err){
              console.log(err);
          });
      };

      $scope.clearCalculator = function () {
            $scope.dataCalculator.tender = 0;
            $scope.dataCalculator.change = 0;
      };

      var _init = function () {
        $scope.clearCalculator();
      };

      _init();
  });
