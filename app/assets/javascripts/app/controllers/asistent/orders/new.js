(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('NewOrders', NewOrdersController);

  function NewOrdersController(UserService,
                              ProductService,
                              OrderService,
                              restaurants,
                              $uibModal) {
    var vm = this;
    var apiCart = null,
        apiSearcProduct = null,
        apiSearchUser = null;

    vm.user = {};
    vm.users = [];
    vm.restaurantsSelected = [];
    vm.restaurants = restaurants || [];
    vm.selectUser = selectUser;
    vm.userOrder = null;
    vm.newProduct = newProduct;
    vm.newUser = newUser;
    vm.editUser = editUser;
    vm.selectProduct = selectProduct;
    vm.selectRestaurant = selectRestaurant;
    vm.itemsToCart = [];
    vm.searchText = null;
    vm.buildProductsOptionsSearch = buildProductsOptionsSearch;

    function buildProductsOptionsSearch(index) {
      return {
        placeholder: 'search-product',
        results: productsResult,
        onRegisterApi: onRegisterApiProductUser,
        show: true,
        query: ''
      };
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
      console.log(data);
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

    function saveOrder() {
      console.log('save');
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

    function newProduct() {
      configModalProduct();
    }

    function newUser() {
      configModalUser();
    }

    function editUser(user) {
      configModalUser(user);
    }

    function successSaveProduct(data) {
      console.log('product: ', data);
    }

    function configModalProduct(item, menu) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'products/new.html',
        controller: 'NewProductController as vm',
        resolve: {
          productData: {
            categories: [],
            item: item || {},
            callback: successSaveProduct
          }
        }
      });
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
        items: itemsOrderFormat(data.items)
      };
      OrderService.newOrder(params).then(function(data){
        console.log(data);
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
      restaurant.selected = !restaurant.selected;
      if (restaurant.selected) {
        vm.restaurantsSelected.push(restaurant);
      }else{
        var index = vm.restaurantsSelected.indexOf(restaurant);
        vm.restaurantsSelected.splice(index, 1);
      }
    }
  }

})();
