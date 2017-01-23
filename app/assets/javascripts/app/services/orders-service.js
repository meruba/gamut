(function () {
'use strict';

  angular
    .module('app.services')
    .factory('OrderService', OrderService);

  function OrderService($http, toastr) {

    var service = {
      lastOrders: lastOrders
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

  }

})();
