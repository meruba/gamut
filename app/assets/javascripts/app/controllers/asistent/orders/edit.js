(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('EditOrdersCtrl', EditOrdersCtrl);

  function EditOrdersCtrl(UserService,
                          ProductService,
                          OrderService,
                          $uibModal,
                          $state,
                          restaurants,
                          user,
                          order) {

    var vm = this;
    var apiCart = null,
        apiSearcProduct = null,
        apiSearchUser = null,
        order = order || {},
        user = user || {};

    vm.users = [];
    vm.restaurants = restaurants || [];
    vm.selectUser = selectUser;
    vm.newUser = newUser;
    vm.editUser = editUser;
    vm.selectProduct = selectProduct;
    vm.selectRestaurant = selectRestaurant;
    vm.itemsToCart = [];
    vm.searchText = null;
    vm.selectedRestaurant = null;

    init();

    function init() {
      vm.selectedRestaurant = findRestaurant(vm.restaurants, order.restaurant_id);
      vm.selectedRestaurant.products = updateProducts(vm.selectedRestaurant.products, order.item_orders);
      vm.userOrder = user;
      vm.showUser = true;
    }

    function updateProducts(original, founds) {
      var updateItems = angular.copy(original);
      angular.forEach(updateItems, function(item){
        angular.forEach(founds, function(elm){
          if (item.id === elm.product_id) {
            item.selected = true;
            item.value = elm.quantity;
            vm.itemsToCart.push(item);
          }
        });
      });
      return updateItems;
    }

    function findRestaurant(restaurants, id) {
      var found = null;
      angular.forEach(restaurants, function(item){
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    }

    vm.optionsCart = {
      items: [],
      onRegisterApi: onRegisterApiCart
    };

    vm.optionsSearch = {
      service: UserService.searchCustomers,
      placeholder: 'search-user',
      results: usersResult,
      onRegisterApi: onRegisterApiSearchUser,
      show: true
    };

    vm.productsOptionsSearch = {
      placeholder: 'search-product',
      results: productsResult,
      onRegisterApi: onRegisterApiProductUser,
      show: true,
      query: ''
    };

    function onRegisterApiCart(api){
      apiCart = api;

      apiCart.checkout(function (data) {
        confirmOrder(data);
      });

      if (order) {
        apiCart.updateAllCart(vm.itemsToCart, order.price_delivery);
      }
    }

    function itemsOrderFormat(items) {
      var result = [];
      angular.forEach(items, function(item){
        var obj = {
          quantity: item.value,
          discount: 0,
          product_id:  item.id,
          unit_value: item.price,
          total: item.totalItem
        };
        result.push(obj);
      });
      return result;
    }

    function onRegisterApiSearchUser(api){
      apiSearchUser = api;

      apiSearchUser.clearInput(function () {
        vm.users = [];
        vm.showUser = vm.userOrder ? true : false
      });

      apiSearchUser.typing(function (text) {
        vm.showUser = false
        if (text.length === 0) {
          vm.users = [];
          vm.showUser = vm.userOrder ? true : false
        }
      });
    }

    function onRegisterApiProductUser(api){
      apiSearcProduct = api;

      apiSearcProduct.clearInput(function () {
        vm.searchText = '';
      });

      apiSearcProduct.typing(function (text) {
        vm.searchText = text;
      });
    }

    function usersResult(data) {
      vm.users = data.search;
    }

    function productsResult(data) {
      vm.products = data.search;
    }

    function newCustomer(data) {
      UserService.newCustomer(data).then(function(user){
        vm.user = user;
      });
    }

    function selectUser(user) {
      vm.userOrder = user;
      vm.users = [];
      vm.showUser = true;
      apiSearchUser.updateText('');
    }

    function selectProduct(product) {
      product.selected = !product.selected;
      apiCart.updateList(product);
    }

    function newUser() {
      configModalUser();
    }

    function editUser(user) {
      configModalUser(user);
    }

    function successSaveUser(user) {
      vm.showUser = true;
      vm.userOrder = user;
    }

    function okModal(data) {
      var params = {
        total: data.meta.deliveryPrice,
        priceDelivery: data.meta.deliveryPrice,
        address: 'Loja',
        userId: vm.userOrder.id,
        restaurantId: vm.selectedRestaurant.id,
        items: itemsOrderFormat(data.items)
      };
      OrderService.newOrder(params).then(function(data){
        $state.go('app.asistent.orders.list');
      });
    }

    function configModalUser(user) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'users/new-modal.html',
        controller: 'UserNewModalController as vm',
        resolve: {
          userData: {
            user: user || {},
            callback: successSaveUser
          }
        }
      });
    }

    function confirmOrder(data) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'shared/dialogs/confirmation.html',
        controller: 'DialogConfirmController as vm',
        resolve: {
          dialogOptions: {
            ok: okModal,
            cancel: function(){},
            data: data
          }
        }
      });
    }

    function selectRestaurant(restaurant) {
      vm.selectedRestaurant = restaurant;
      vm.selectedRestaurant.products = resetSelectedProducts(vm.selectedRestaurant.products, false);
      apiCart.pullItems([]);
    }

    function resetSelectedProducts(products, state) {
      angular.forEach(products, function(item){
        item.selected = state;
      });
      return products;
    }

  }

})();
