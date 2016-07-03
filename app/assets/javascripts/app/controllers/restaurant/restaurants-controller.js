(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantsController', RestaurantsController);

  function RestaurantsController(restData,
                                RestaurantService,
                                $scope) {
    var vmRest = this;
    vmRest.search = search;

    init();

    function init() {
      vmRest.restList = restData.restaurants;
      vmRest.searchForm = false;
      vmRest.query = '';
      //update header controller values
      $scope.vmHeader.showNewRest = true;
      $scope.vmHeader.showNewMenu = false;
      $scope.vmHeader.onlyRests = true;
    }

    function search(query) {
      RestaurantService.searchRestaurant(query).then(function(resp){
        vmRest.restList = resp.search;
        $scope.vmHeader.totalRest = resp.meta.count;
      });
    }

    $scope.$on('_SHOW_SEARCH_RESTAURANT_',function (ev, show) {
      vmRest.searchForm = show;
      if (!vmRest.searchForm && vmRest.query.length !== 0) {
        vmRest.query = '';
        search(vmRest.query);
      }
    })

  }

})();
