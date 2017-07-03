(function () {
'use strict';

  angular
    .module('app.services')
    .factory('OrderService', OrderService);

  function OrderService($http, toastr) {

    var service = {
      lastOrders: lastOrders,
      newOrder: newOrder
    };

    return service;

    function lastOrders(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/orders'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function newOrder(params) {
      return $http({
        method: 'POST',
        url: '/api/v1/orders',
        data:{
          total: params.total,
          price_delivery: params.priceDelivery,
          address: params.address,
          user_id: params.userId,
          restaurant_id: params.restaurantId,
          item_orders_attributes: params.items
        }
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

  }

})();
