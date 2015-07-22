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
            order.totalTaxes = 0;
            order.totalDiscounts = 0;
            angular.forEach(order.foods, function(value) {
                FoodService.subTotalFood(value);
                order.total += value.subTotal;
            });
            order.totalNow = angular.copy(order.total);
            angular.forEach(order.taxes, function(value) {
                var priceTax = 0;
                if (value.amount) {
                    value.amount = parseFloat(value.amount);
                    priceTax = value.amount;
                } else {
                    value.rate = parseFloat(value.rate);
                    priceTax = order.totalNow / 100 * value.rate;
                }
                order.totalTaxes += priceTax;
            });

            angular.forEach(order.discounts, function(value) {
                var priceTax = 0;
                if (value.amount) {
                    value.amount = parseFloat(value.amount);
                    priceTax = value.amount;
                } else {
                    value.rate = parseFloat(value.rate);
                    priceTax = order.totalNow / 100 * value.rate;
                }
                order.totalDiscounts += priceTax;
            });

            order.total = order.total + order.totalTaxes - order.totalDiscounts;
            return order;
        };

        this.checkDiscountTax = function (item, array) {
            var check = false;
            for (var i = 0; i < array.length; i++) {
                if (item._id == array[i]._id) {
                    check = true;
                    return true;
                }
            }
            return check;
        }

    });
