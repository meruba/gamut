(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('OrderListCtrl', OrderListCtrl);

  function OrderListCtrl($scope,
                        orders,
                        $state) {
    var vm = this;
    var apiSearchOrder = null;
    vm.orders = orders || [];
    vm.updateOrder = updateOrder;
    vm.limitShowRows = 15;
    vm.loadRows = 10;
    vm.showLoadButton = true;
    vm.loadMoreRows = loadMoreRows;

    vm.optionsSearch = {
      placeholder: 'search-order',
      results: orderResult,
      onRegisterApi: apiSearch,
      show: true,
      query: ''
    };

    function apiSearch(api){
      apiSearchOrder = api;

      apiSearchOrder.clearInput(function () {
        vm.searchText = '';
      });

      apiSearchOrder.typing(function (text) {
        vm.searchText = text;
      });
    }

    function orderResult(data) {
      vm.orders = data.search;
    }

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
