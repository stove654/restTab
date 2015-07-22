
'use strict';

/**
 * @ngdoc function
 * @name restTabApp.controller:TaxesMenuCtrl
 * @description
 * # TaxesMenuCtrl
 * Controller of the restTabApp
 */
angular.module('restTabApp')
    .controller('TaxesCtrl', function ($scope, TaxesService) {

        $scope.listTaxes = [];
        $scope.tax = {};

        $scope.getListTaxes = function () {
          TaxesService.getTaxes().then(function(data){
              $scope.listTaxes = data;
              console.log($scope.listTaxes);
          }, function(err){
              console.log(err);
          });
        };

        $scope.createTax = function () {
            console.log($scope.tax);
            TaxesService.createTax($scope.tax).then(function(data){
                $scope.getListTaxes();
                $scope.tax = {};
            }, function(err){
                console.log(err);
            });
        };


        var _init = function () {
            $scope.getListTaxes();
        };
        _init();
    });
