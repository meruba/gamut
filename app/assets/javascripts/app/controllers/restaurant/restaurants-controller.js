(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantsController', RestaurantsController);

  function RestaurantsController(restData,
                                RestaurantService,
                                $scope) {
    var vmRest = this;

    init();

    function init() {
      vmRest.restList = restData.restaurants;
      vmRest.optionsSearch = {
        service: RestaurantService.searchRestaurant,
        placeholder: 'search-restaurant'
      };
      //update header controller values
      $scope.vmHeader.showNewRest = true;
      $scope.vmHeader.showNewMenu = false;
      $scope.vmHeader.onlyRests = true;
    }

    $scope.$on('_SEARCH_RESULTS_',function (ev, data) {
      vmRest.restList = data.search;
      $scope.vmHeader.totalRest = data.meta.count;
    });

  }

})();
