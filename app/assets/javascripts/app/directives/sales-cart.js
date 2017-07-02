(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('salesCart', salesCart);

  function salesCart() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/sales-cart/sales-cart.html',
      scope: {
        options: '='
      },
      controller: cartController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function cartController(){
    var vm = this;
    vm.calculate = calculate;
    vm.sumValues = sumValues;

    init();

    function init() {
      var options = vm.options || {};
      vm.restaurants = vm.data || {};
      vm.items = vm.options.items || [];
      vm.totalOrder = 0;
      vm.deliveryPrice = 0;

      if (options.onRegisterApi) {
        var api = createPublicApi();
        options.onRegisterApi(api);
      }
    }

    function createPublicApi() {
      return {
        updateList: addRemoveList
      };
    }

    function addRemoveList(product) {
      if (product.selected) {
        vm.items.push(product);
      }else{
        var index = vm.items.indexOf(product);
        vm.items.splice(index, 1);
      }
      sumValues();
    }

    //checkout form
    function calculate(item) {
      item.value = item.value || 1;
      item.totalItem = item.value * item.price;
      /*round 2 decimal*/
      item.totalItem = Math.round(item.totalItem * 100) / 100;
      sumValues();
    }

    function sumValues() {
      vm.totalOrder = 0;
      angular.forEach(vm.items, function(item) {
        vm.totalOrder = vm.totalOrder + (item.totalItem || item.price) ;
      });
      /*round 2 decimal*/
      vm.totalOrder = vm.totalOrder + vm.deliveryPrice;
      vm.totalOrder = Math.round(vm.totalOrder * 100) / 100;
    }
  }

})();
