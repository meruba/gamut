(function () {
'use strict';

  angular
    .module('app.services')
    .factory('RestaurantService', RestaurantService);

  function RestaurantService($http, toastr) {

    var service = {
      restaurants: restaurants,
      restaurant: restaurant,
      newRestaurant: newRestaurant
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

    function newRestaurant(params) {
      return $http({
        method: 'POST',
        url: '/api/v1/restaurants',
        data:{
          name: params.name,
          email: params.email,
          address: params.address,
          telephone: params.telephone
        }
      }).then(function success(res) {
        toastr.success('Almacenado Exitosamente!', 'Restaurante');
        return res.data;
      }, function error(err) {
        toastr.error('Ha Ocurrido un error', 'Error');
        console.error('ERR', err);
      });
    }

  }

})();