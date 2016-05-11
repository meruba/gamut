(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantController', RestaurantController);

  function RestaurantController(restData) {
    var vmRest = this;
    vmRest.rest = restData;
  }

})();
