
'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:DiscountsCtrl
 * @description
 * # DiscountsCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
    .controller('DiscountsCtrl', function ($scope, DiscountsService) {

        $scope.listDiscounts = [];
        $scope.discount = {};

        $scope.getListDiscounts = function () {
            DiscountsService.getDiscounts().then(function(data){
              $scope.listDiscounts = data;
              console.log($scope.listDiscounts);
          }, function(err){
              console.log(err);
          });
        };

        $scope.createDiscount = function () {
            DiscountsService.createDiscount($scope.discount).then(function(data){
                $scope.getListDiscounts();
                $scope.discount = {};
            }, function(err){
                console.log(err);
            });
        };

        var _init = function () {
            $scope.getListDiscounts();
        };
        _init();
    });
