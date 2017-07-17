(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('OrderListCtrl', OrderListCtrl);

  function OrderListCtrl($scope,
                        orders,
                        $state) {
    var vm = this;
    vm.orders = orders || [];
    vm.updateOrder = updateOrder

    function updateOrder(order) {
      console.log(order);
      $state.go('app.asistent.orders.edit', {orderId: order.id, userId: order.user_id})
    }
  }

})();
