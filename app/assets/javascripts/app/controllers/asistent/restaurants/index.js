(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantsCtrl', RestaurantsCtrl);

  function RestaurantsCtrl($scope,
                          restaurants,
                          $uibModal) {
    var vm = this;
    var apiSearcProduct = null;
    vm.restaurants = restaurants || [];
    vm.selectedRestaurant = vm.restaurants[0];
    vm.selectRestaurant = selectRestaurant
    vm.newProduct = newProduct;
    vm.editProduct = editProduct;
    vm.searchText = null;

    vm.productsOptionsSearch = {
      placeholder: 'search-product',
      onRegisterApi: onRegisterApiProductUser,
      show: true,
      query: vm.searchText
    };

    function onRegisterApiProductUser(api){
      apiSearcProduct = api;

      apiSearcProduct.clearInput(function () {
        vm.searchText = '';
      });

      apiSearcProduct.typing(function (text) {
        vm.searchText = text;
      });
    }

    function newProduct() {
      configModalProduct();
    }

    function editProduct(item, index) {
      vm.idexUpdateProduct = index;
      configModalProduct(item);
    }

    function selectRestaurant(restaurant) {
      vm.selectedRestaurant = restaurant
    }

    function successSaveProduct(data, action) {
      var product = (action === 'update') ? data : data.product;
      if (action === 'update') {
        //hack id
        var productId = vm.selectedRestaurant.products[vm.idexUpdateProduct].id;
        product.id = productId;
        vm.selectedRestaurant.products[vm.idexUpdateProduct] = product;
      }else{
        vm.selectedRestaurant.products.push(product);
      };
    }

    function configModalProduct(item) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'products/new.html',
        controller: 'NewProductController as vm',
        resolve: {
          productData: {
            categories: [],
            item: item || {},
            restaurantId: vm.selectedRestaurant.id,
            callback: successSaveProduct
          }
        }
      });
    }

  }

})();
