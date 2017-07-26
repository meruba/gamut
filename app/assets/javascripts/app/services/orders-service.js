(function () {
'use strict';

  angular
    .module('app.services')
    .factory('OrderService', OrderService);

  function OrderService($http, toastr) {

    var service = {
      lastOrders: lastOrders,
      newOrder: newOrder,
      editOrder, editOrder,
      order: order
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
        return err.data;
      });
    }

    function editOrder(params) {
      return $http({
        method: 'PUT',
        url: '/api/v1/orders',
        data:{
          total: params.total,
          price_delivery: params.priceDelivery,
          address: params.address,
          user_id: params.userId,
          restaurant_id: params.restaurantId,
          item_orders_attributes: params.items,
          order_id: params.order_id
        }
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        return err.data;
      });
    }

    function order(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/orders/' + id
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

  }

})();
