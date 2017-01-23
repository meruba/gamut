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
        placeholder: 'search-restaurant',
        results: searchResults
      };
      //update header controller values
      $scope.vmHeader.showNewRest = true;
      $scope.vmHeader.showNewMenu = false;
      $scope.vmHeader.onlyRests = true;
    }

    function searchResults(data) {
      vmRest.restList = data.search;
      $scope.vmHeader.totalRest = data.meta.count;
    }

  }

})();
