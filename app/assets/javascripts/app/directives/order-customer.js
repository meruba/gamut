(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('orderCustomer', orderCustomer);

  function orderCustomer() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/order-customer/order-customer.html',
      scope: {
        data: '=',
        event: '&'
      },
      controller: formController,
      controllerAs: 'oc',
      bindToController: true
    };

    return directive;
  }

  formController.$inject = ['$scope', '$rootScope', 'UserService'];

  function formController($scope,
                          $rootScope,
                          UserService){

    var oc = this;
    oc.selectRest = selectRest;
    oc.showRestaurants = showRestaurants;
    oc.addProduct = addProduct;
    oc.calculate = calculate;
    oc.sumValues = sumValues;

    oc.load = true;

    init();

    function init() {
      oc.restaurants = oc.data || {};
      oc.itemsSelected = [];
      oc.userForm = {};
      oc.totalOrder = 0;
      oc.deliveryPrice = 0;
      oc.optionsSearch = {
        selected: userSelected
      }
    }

    function selectRest(rest, index) {
      if (oc.selectedRest) {
        oc.selectedRest.selected = false;
      }
      oc.selectedRest = rest;
      /*add class new content selected*/
      rest.selected = true;
      toggleMenu(rest.products);
    }

    function toggleMenu(products) {
      oc.showMenu = true;
      oc.menu = products;
      oc.showHeader = true;
    }

    function showRestaurants() {
      oc.showHeader = !oc.showHeader;
      oc.menu = [];
      /*reset check*/
      angular.forEach(oc.itemsSelected, function(menu) {
        menu.selected = false;
      });
      oc.itemsSelected = [];
      oc.totalOrder = 0;
    }

    function addProduct(menu) {
      menu.selected = menu.selected === undefined ? true : !menu.selected;
      if (menu.selected) {
        oc.itemsSelected.push(menu);
      }else{
        var index = oc.itemsSelected.indexOf(menu);
        oc.itemsSelected.splice(index, 1);
      }
      sumValues();
    }

    function userSelected(user) {
      oc.userForm = user;
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
      oc.totalOrder = 0;
      angular.forEach(oc.itemsSelected, function(item) {
        oc.totalOrder = oc.totalOrder + (item.totalItem || item.price) ;
      });
      /*round 2 decimal*/
      oc.totalOrder = oc.totalOrder + oc.deliveryPrice;
      oc.totalOrder = Math.round(oc.totalOrder * 100) / 100;
    }

  }

})();
