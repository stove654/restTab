'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierCtrl
 * @description
 * # CashierCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
  .controller('CashierCtrl', function ($scope, localStorageService) {
      $scope.user = {};
      $scope.user = localStorageService.get('user');
  });
