'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
  .controller('AdminCtrl', function ($scope, localStorageService) {

      $scope.user = {};
      $scope.user = localStorageService.get('user');


  });
