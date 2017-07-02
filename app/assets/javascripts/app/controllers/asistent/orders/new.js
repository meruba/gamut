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

    vm.user = {};
    vm.users = [];
    vm.products = products || [];
    vm.userForm = {};
    vm.nextStep = nextStep;
    vm.prevStep = prevStep;
    vm.showForm = false;
    vm.selectUser = selectUser;
    vm.userSelected = null;
    vm.newProduct = newProduct;

    vm.optionsSearch = {
      service: UserService.searchUsers,
      placeholder: 'search-user',
      results: usersResult,
      show: true
    };

    vm.productsOptionsSearch = {
      service: ProductService.searchProducts,
      placeholder: 'search-product',
      results: productsResult,
      show: true
    }

    vm.steps = [
      {
        templateUrl: 'asistent/orders/partials/form-basic.html',
        active: false,
        onClik: newCustomer,
        params: vm.userForm,
        active: true
      },
      {
        templateUrl: 'asistent/orders/partials/form-items.html',
        active: false,
        onClik: saveOrder,
        active: false
      }
    ];

    function usersResult(data) {
      vm.users = data.search;
    }

    function productsResult(data) {
      vm.products = data.search;
      console.log('products: ', vm.products);
    }

    function newCustomer(data) {
      UserService.newCustomer(data).then(function(user){
        vm.user = user;
        console.log(user);
      });
    }

    function saveOrder() {
      console.log('save');
    }

    function changeStep(current, add) {
      var index = add ? current + 1 : current - 1;
      vm.steps[index].active = true;
    }

    function nextStep(step, index) {
      if (index >= 0 && index < vm.steps.length - 1) {
        step.active = false;
        changeStep(index, true);
        // step.onClik(step.params);
      }
    }

    function prevStep(step, index) {
      if (index > 0 && index <= vm.steps.length) {
        step.active = false;
        changeStep(index, false);
      }
    }

    function selectUser(user) {
      vm.userSelected = user;
      vm.users = [];
      vm.showForm = true;
      vm.userForm = user;
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
