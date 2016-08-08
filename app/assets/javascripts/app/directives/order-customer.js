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
    oc.load = true;

    init();

    function init() {
      oc.restaurants = oc.data || {};
      oc.itemsSelected = [];
      oc.userForm = {};
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
      sendFields(oc.itemsSelected);
    }

    function addProduct(menu) {
      menu.selected = menu.selected === undefined ? true : !menu.selected;
      if (menu.selected) {
        oc.itemsSelected.push(menu);
      }else{
        var index = oc.itemsSelected.indexOf(menu);
        oc.itemsSelected.splice(index, 1);
      }
      sendFields(oc.itemsSelected);
    }

    function sendFields(data) {
      $rootScope.$broadcast('_ORDER_FIELDS', data);
    }

    function userSelected(user) {
      oc.userForm = user;
    }
  }

})();
