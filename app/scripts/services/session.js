'use strict';

/**
 * @ngdoc service
 * @name restTabApp.session
 * @description
 * # session
 * Service in the restTabApp.
 */
angular.module('restTabApp')
  .service('SessionService', function (localStorageService, $state) {

    var session = {};

    session.isToken = function () {
      var isLoggedIn = false;
      if (localStorageService.get('user')) {
        var user = localStorageService.get('user');
        if (user.email) {
          isLoggedIn = true;
        }
      }
      return {
        isLoggedIn: isLoggedIn
      };
    };

    return session;
  });
