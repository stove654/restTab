'use strict';

/**
 * @ngdoc service
 * @name restTabApp.UsersService
 * @description
 * # UsersService
 * Service in the restTabApp.
 */
angular.module('restTabApp')
    .factory('UsersService', function (ENV, $http) {

        var url = {
            users: ENV.apiEndpoint + 'users'
        };

        var api = {};

        api.getUsers = function () {
            return $http.get(url.users).then(function(data) {
                return data.data;
            });
        };

        api.addUserAdmin = function (params) {
            return $http.post(url.users, params).then(function(data) {
                return data.data;
            });
        };

        return api;
    });
