'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:CashierFoodCtrl
 * @description
 * # CashierFoodCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
    .controller('CashierFoodCtrl', function ($scope, $modalInstance, food, FoodService) {

        FoodService.subTotalFood(food);
        $scope.food = food;

        $scope.selectedOption = function (option) {
            if (option.selected) {
                option.selected = false;
            } else {
                option.selected = true;
            }
            FoodService.subTotalFood(food);
        };

        $scope.ok = function () {
            $modalInstance.close($scope.food);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
