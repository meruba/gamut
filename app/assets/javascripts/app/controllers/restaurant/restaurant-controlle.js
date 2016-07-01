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
      vmRest.imageOptions = {
        image: vmRest.rest.logo,
        identicon: vmRest.rest.email,
        url: '/api/v1/restaurants/'+ vmRest.rest.id +'/upload_image'
      };
      //update header controller values
      $scope.vmHeader.showNewRest = false;
      $scope.vmHeader.showNewMenu = false;
    }

  }

})();
