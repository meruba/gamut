(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantsCtrl', RestaurantsCtrl);

  function RestaurantsCtrl($scope,
                          restaurants) {
    var vm = this;
    vm.restaurants = restaurants || [];
    vm.selectedRestaurant = vm.restaurants[0];
    vm.selectRestaurant = selectRestaurant

    function selectRestaurant(restaurant) {
      vm.selectedRestaurant = restaurant
    }
  }

})();
