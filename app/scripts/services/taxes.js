'use strict';

/**
 * @ngdoc service
 * @name restTabApp.TaxesService
 * @description
 * # TaxesService
 * Service in the restTabApp.
 */
angular.module('restTabApp')
    .factory('TaxesService', function (ENV, $http) {

        var url = {
            taxes: ENV.apiEndpoint + 'taxes',
        };

        var api = {};

        api.getTaxes = function () {
            return $http.get(url.taxes).then(function(data) {
                api.taxes = data.data;
                return data.data;
            });
        };

        api.createTax = function (tax) {
            return $http.post(url.taxes, tax).then(function(data) {
                return data.data;
            });
        };

        return api;
    });
