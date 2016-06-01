(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantsController', RestaurantsController);

  function RestaurantsController(restData,
                                $scope) {
    var vmRest = this;

    init();

    function init() {
      vmRest.restList = restData.restaurants;
      vmRest.totalRest = vmRest.restList.length;
      //update header controller values
      $scope.vmHeader.showNewRest = true;
    }

  }

})();
