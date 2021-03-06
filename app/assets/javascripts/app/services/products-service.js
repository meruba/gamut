(function () {
'use strict';

  angular
    .module('app.services')
    .factory('ProductService', ProductService);

  function ProductService($http, toastr) {

    var service = {
      product: product,
      newProduct: newProduct,
      updateProduct: updateProduct,
      removeProduct: removeProduct,
      publicProduct: publicProduct
    };

    return service;

    function product(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/products/' + id
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function newProduct(params) {
      return $http({
        method: 'POST',
        url: '/api/v1/products',
        data:{
          name: params.name,
          description: params.description,
          price: params.price,
          category_id: params.category_id,
          restaurant_id: params.restaurant_id
        }
      }).then(function success(res) {
        toastr.success('Almacenado Exitosamente!', 'Menu');
        return res.data;
      }, function error(err) {
        return err.data;
      });
    }

    function updateProduct(params) {
      return $http({
        method: 'PUT',
        url: '/api/v1/products/' + params.id,
        data:{
          name: params.name,
          description: params.description,
          price: params.price,
          category_id: params.category_id,
          restaurant_id: params.restaurant_id
        }
      }).then(function success(res) {
        toastr.info('Actualizado Exitosamente!', 'Menu');
        return res.config.data;
      }, function error(err) {
        return err.data;
      });
    }

    function removeProduct(id) {
      return $http({
        method: 'POST',
        url: '/api/v1/products/'+ id + '/remove'
      }).then(function success(res) {
        toastr.info('Eliminado Exitosamente!', 'Menu');
        return res.data;
      }, function error(err) {
        return err.data;
      });
    }

    function publicProduct(id) {
      return $http({
        method: 'POST',
        url: '/api/v1/products/'+ id + '/public'
      }).then(function success(res) {
        toastr.info('Actualizado Exitosamente!', 'Menu');
        return res.data;
      }, function error(err) {
        return err.data;
      });
    }

  }

})();
