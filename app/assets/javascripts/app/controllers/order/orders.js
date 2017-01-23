(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('OrdersController', OrdersController);

  function OrdersController(ordersData) {
    var vmOrders = this;

    init();

    function init() {
      vmOrders.orders = ordersData.orders;
    }
  }

})();
