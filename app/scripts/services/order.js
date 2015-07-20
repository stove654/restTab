'use strict';

/**
 * @ngdoc service
 * @name restTabApp.OrderService
 * @description
 * # OrderService
 * Service in the restTabApp.
 */
angular.module('restTabApp')
    .service('OrderService', function (FoodService) {

        this.totalOrder = function (order) {
            order.total = 0;
            angular.forEach(order.foods, function(value) {
                FoodService.subTotalFood(value);
                order.total += value.subTotal;
            });
            return order;
        }

    });
