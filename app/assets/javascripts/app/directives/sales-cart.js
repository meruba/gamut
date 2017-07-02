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
    vm.selectRest = selectRest;
    vm.showRestaurants = showRestaurants;
    vm.addProduct = addProduct;
    vm.calculate = calculate;
    vm.sumValues = sumValues;

    vm.load = true;

    init();

    function init() {
      var options = vm.options || {};
      vm.restaurants = vm.data || {};
      vm.items = vm.options.items || [];
      vm.userForm = {};
      vm.totalOrder = 0;
      vm.deliveryPrice = 0;
      vm.optionsSearch = {
        selected: userSelected
      }

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

    function selectRest(rest, index) {
      if (vm.selectedRest) {
        vm.selectedRest.selected = false;
      }
      vm.selectedRest = rest;
      /*add class new content selected*/
      rest.selected = true;
      toggleMenu(rest.products);
    }

    function toggleMenu(products) {
      vm.showMenu = true;
      vm.menu = products;
      vm.showHeader = true;
    }

    function showRestaurants() {
      vm.showHeader = !vm.showHeader;
      vm.menu = [];
      /*reset check*/
      angular.forEach(vm.items, function(menu) {
        menu.selected = false;
      });
      vm.items = [];
      vm.totalOrder = 0;
    }

    function addProduct(menu) {
      menu.selected = menu.selected === undefined ? true : !menu.selected;
      if (menu.selected) {
        vm.items.push(menu);
      }else{
        var index = vm.items.indexOf(menu);
        vm.items.splice(index, 1);
      }
      sumValues();
    }

    function userSelected(user) {
      vm.userForm = user;
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
