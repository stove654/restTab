'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierMainCtrl
 * @description
 * # CashierMainCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
    .controller('CashierMenuCtrl', function ($scope, MenuService, localStorageService, $modal, FoodService) {
        $scope.categories = [];
        $scope.categorySelected = {};
        $scope.foods = [];
        $scope.numberGrid = 3;
        $scope.searchText = '';

        $scope.getCategories = function () {
            MenuService.getCategories().then(function(data){
              if (data.length) {
                $scope.selectCategory(MenuService.categories[0]);
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

        $scope.selectFilter = function (name) {
            if (name) {
                $scope.searchText = name;
            } else {
                $scope.searchText = ''
            }
            localStorageService.set('searchText', $scope.searchText)
        };

        $scope.openFood = function (data) {
            var food = angular.copy(data);
            food.quantity = 1;
            if (food.options.length) {
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
                    $scope.addFoodOrder(food);
                }, function () {

                });
            } else {
                FoodService.subTotalFood(food);
                $scope.addFoodOrder(food);
            }

        };

        var _init = function () {
            if (localStorageService.get('numberGrid')) {
                $scope.numberGrid = localStorageService.get('numberGrid')
            }
            if (localStorageService.get('searchText')) {
                $scope.searchText = localStorageService.get('searchText');
            }
            $scope.getCategories();
        };
        _init();
    });
