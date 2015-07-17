
'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:StaffMenuCtrl
 * @description
 * # StaffMenuCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
  .controller('StaffMenuCtrl', function ($scope, MenuService) {

      $scope.categories = [];
      $scope.category = {};
      $scope.categorySelected = {};
      $scope.foods = [];

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

      $scope.createCategory = function () {
        var params = {};
        params.name = $scope.category.name;
        params.children = [];
        MenuService.createCategory(params).then(function(data){
          _init();
          $scope.category = {};
        }, function(err){
          console.log(err);
        });
      };

      $scope.selectCategory = function (item) {
        $scope.categorySelected = item;
        $scope.getFoodsByCategory();
      };

      $scope.createSubcategory = function () {

      };

      var _init = function () {
        $scope.getCategories();
      };
      _init();

  });
