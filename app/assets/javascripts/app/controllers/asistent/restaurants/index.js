(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantsCtrl', RestaurantsCtrl);

  function RestaurantsCtrl($scope,
                          restaurants) {
    var vm = this;
    vm.restaurants = restaurants || [];
  }

})();
