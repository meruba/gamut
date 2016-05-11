(function () {
'use strict';

  angular
    .module('app.services')
    .factory('RestaurantService', RestaurantService);

  function RestaurantService($http) {
    var service = {
      restaurants: restaurants,
      restaurant: restaurant
    };

    return service;

    function restaurants() {
      return $http({
        method: 'GET',
        url: '/api/v1/restaurants'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function restaurant(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/restaurants/' + id
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }
  }

})();
