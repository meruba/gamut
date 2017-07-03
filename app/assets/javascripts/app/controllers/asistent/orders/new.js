(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('NewOrders', NewOrdersController);

  function NewOrdersController(UserService,
                              ProductService,
                              products,
                              $uibModal) {
    var vm = this;
    var apiCart = null,
        apiSearcProduct = null,
        apiSearchUser = null;

    vm.user = {};
    vm.users = [];
    vm.products = products || [];
    vm.selectUser = selectUser;
    vm.userOrder = null;
    vm.newProduct = newProduct;
    vm.selectProduct = selectProduct;
    vm.itemsToCart = [];

    vm.optionsCart = {
      items: [],
      onRegisterApi: onRegisterApiCart
    }

    vm.optionsSearch = {
      service: UserService.searchUsers,
      placeholder: 'search-user',
      results: usersResult,
      onRegisterApi: onRegisterApiSearchUser,
      show: true
    };

    vm.productsOptionsSearch = {
      service: ProductService.searchProducts,
      placeholder: 'search-product',
      results: productsResult,
      onRegisterApi: onRegisterApiProductUser,
      show: true
    }

    function onRegisterApiCart(api){
      apiCart = api;
    }

    function onRegisterApiSearchUser(api){
      apiSearchUser = api;

      apiSearchUser.clearInput(function () {
        vm.users = [];
        vm.showUser = true
      });

      apiSearchUser.typing(function (text) {
        vm.showUser = false
        if (text.length === 0) {
          vm.users = [];
          vm.showUser = true
        }
      });
    }

    function onRegisterApiProductUser(api){
      apiSearcProduct = api;
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
      configModal();
    }

    function successSaveProduct(data) {
      console.log('product: ', data);
    }

    function configModal(item, menu) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'products/new.html',
        controller: 'NewProductController as vm',
        resolve: {
          productData: {
            categories: [],
            item: item || {},
            menu: menu || [],
            callback: successSaveProduct
          }
        }
      });
    }
  }

})();