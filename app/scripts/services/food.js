'use strict';

/**
 * @ngdoc service
 * @name restTabApp.FoodService
 * @description
 * # FoodService
 * Service in the restTabApp.
 */
angular.module('restTabApp')
    .service('FoodService', function () {

        this.subTotalFood = function (data) {
            data.subTotal = 0;
            data.price = parseFloat(data.price);
            var totalOneFood = data.price;
            data.customId = angular.copy(data._id)
            angular.forEach(data.options, function(value) {
                value.price = parseFloat(value.price);
                if (value.selected) {
                    totalOneFood += value.price;
                    data.customId = data.customId + value.name;
                }
            });
            data.subTotal = totalOneFood * data.quantity;
            if (data.discount) {
                if (data.discount.amount) {
                    data.discount.amount = parseFloat(data.discount.amount);
                    data.subTotal = data.subTotal - data.discount.amount;
                } else {
                    data.discount.rate = parseFloat(data.discount.rate);
                    data.subTotal = data.subTotal - (data.subTotal * data.discount.rate)/100;
                }
                data.customId = data.customId + value._id + data.discount._id;
            }
            if (data.note) {
                data.customId = data.customId + value._id + data.discount._id + data.note;
            }
            console.log(data);
        }
    });
