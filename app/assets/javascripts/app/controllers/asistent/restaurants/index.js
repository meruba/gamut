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
    vm.newRestaurant = newRestaurant;
    vm.editRestaurant = editRestaurant;
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

    function newRestaurant() {
      configModalRestaurant();
    }

    function editRestaurant(item, index) {
      configModalRestaurant(item);
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

    function successSaveRestaurant(data, action) {
      var restaurant = data;
      if (action === 'update') {
        vm.selectedRestaurant = updateValues(vm.selectedRestaurant, restaurant);
      }else{
        vm.restaurants.push(restaurant);
        vm.selectedRestaurant = restaurant;
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

    function configModalRestaurant(item) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'asistent/restaurants/new.html',
        controller: 'RestNewController as vm',
        resolve: {
          restaurantData: {
            item: item || {},
            callback: successSaveRestaurant
          }
        }
      });
    }

    function updateValues(source, obj) {
      angular.forEach(obj, function(value, key){
        source[key] = value;
      });
      return source;
    }

  }

})();
