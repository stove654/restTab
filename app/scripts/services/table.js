'use strict';

/**
 * @ngdoc service
 * @name restTabApp.TableService
 * @description
 * # TableService
 * Service in the restTabApp.
 */
angular.module('restTabApp')
    .factory('TableService', function (ENV, $http) {

        var url = {
            tables: ENV.apiEndpoint + 'tables',
        };

        var api = {};

        api.getTables = function () {
            return $http.get(url.tables).then(function(data) {
                api.tables = data.data;
                return data.data;
            });
        };



        return api;
    });
