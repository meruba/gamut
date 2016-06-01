(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantController', RestaurantController);

  function RestaurantController(restData,
                                $scope) {
    var vmRest = this;

    init();

    function init() {
      vmRest.rest = restData;
      //update header controller values
      $scope.vmHeader.showNewRest = false;
      $scope.vmHeader.showNewMenu = false;
    }

  }

})();
