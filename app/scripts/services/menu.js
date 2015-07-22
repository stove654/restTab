'use strict';

/**
 * @ngdoc service
 * @name restTabApp.UsersService
 * @description
 * # UsersService
 * Service in the restTabApp.
 */
angular.module('restTabApp')
    .factory('MenuService', function (ENV, $http) {

        var url = {
            categories: ENV.apiEndpoint + 'categories',
            foods: ENV.apiEndpoint + 'foods'
        };

        var api = {};

        api.getCategories = function () {
            return $http.get(url.categories).then(function(data) {
                api.categories = data.data;
                return data.data;
            });
        };

        api.createCategory = function (params) {
            return $http.post(url.categories, params).then(function(data) {
                return data.data;
            });
        };

        api.getFoodsByCategory = function (id) {
            return $http.get(url.foods + '/category/' + id).then(function(data) {
                api.foods = data.data;
                return data.data;
            });
        };

        return api;
    });
