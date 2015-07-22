'use strict';

/**
 * @ngdoc service
 * @name restTabApp.DiscountsService
 * @description
 * # DiscountsService
 * Service in the restTabApp.
 */
angular.module('restTabApp')
    .factory('DiscountsService', function (ENV, $http) {

        var url = {
            discounts: ENV.apiEndpoint + 'discounts'
        };

        var api = {};

        api.getDiscounts = function () {
            return $http.get(url.discounts).then(function(data) {
                api.discounts = data.data;
                return data.data;
            });
        };

        api.createDiscount = function (discount) {
            return $http.post(url.discounts, discount).then(function(data) {
                return data.data;
            });
        };

        return api;
    });
