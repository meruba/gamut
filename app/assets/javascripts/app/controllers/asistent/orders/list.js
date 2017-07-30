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
    vm.updateOrder = updateOrder;
    vm.limitShowRows = 15;
    vm.loadRows = 10;
    vm.showLoadButton = true;
    vm.loadMoreRows = loadMoreRows;

    function updateOrder(order) {
      console.log(order);
      $state.go('app.asistent.orders.edit', {orderId: order.id, userId: order.user_id})
    }

    function loadMoreRows(day) {
      vm.limitShowRows = vm.limitShowRows + vm.loadRows;
      vm.showLoadButton = vm.limitShowRows < vm.orders.length;
    }
  }

})();
