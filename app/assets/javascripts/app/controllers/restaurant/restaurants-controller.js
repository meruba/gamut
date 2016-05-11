(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantsController', RestaurantsController);

  function RestaurantsController(restData) {
    var vmRest = this;
    vmRest.restList = restData.restaurants;
    vmRest.totalRest = vmRest.restList.length;
  }

})();
