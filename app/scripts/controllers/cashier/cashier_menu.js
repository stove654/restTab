'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierMainCtrl
 * @description
 * # CashierMainCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
  .controller('CashierMenuCtrl', function ($scope, MenuService, localStorageService) {
      $scope.categories = [];
      $scope.categorySelected = {};
      $scope.foods = [];
      $scope.numberGrid = 3;

      $scope.getCategories = function () {
        MenuService.getCategories().then(function(data){
          if (data.length) {
            $scope.selectCategory(data[0]);
            $scope.getFoodsByCategory();
          }
          $scope.categories = data;
        }, function(err){
          console.log(err);
        });
      };

      $scope.getFoodsByCategory = function () {
        $scope.foods = [];
        MenuService.getFoodsByCategory($scope.categorySelected._id).then(function(data){
          $scope.foods = data;
        }, function(err){
          console.log(err);
        });
      };


      $scope.selectCategory = function (item) {
        $scope.categorySelected = item;
        $scope.getFoodsByCategory();
      };

      $scope.selectNumberGrid = function (grid) {
        $scope.numberGrid = grid;
        localStorageService.set('numberGrid', grid)
      };

      var _init = function () {
        if (localStorageService.get('numberGrid')) {
          $scope.numberGrid = localStorageService.get('numberGrid')
        }
        $scope.getCategories();
      };
      _init();
  });
