'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierCalculatorCtrl
 * @description
 * # CashierCalculatorCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
  .controller('CashierCalculatorCtrl', function ($scope, MathNumber) {

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
        if (!$scope.dataCalculator.tender) {
          $scope.dataCalculator.tender = 0;
        }
      };

      $scope.keyBoardClear = function () {
        $scope.clearCalculator();
      };

      $scope.keyBoardConfirm = function () {

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
