(function () {
'use strict';

  angular
    .module('app.services')
    .factory('CategoryService', CategoryService);

  function CategoryService($http, toastr) {

    var service = {
      category: category,
      newCategory: newCategory,
      updateCategory: updateCategory,
      removeCategory: removeCategory
    };

    return service;

    function category(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/categories/' + id
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function newCategory(params) {
      return $http({
        method: 'POST',
        url: '/api/v1/categories',
        data:{
          name: params.name,
          restaurant_id: params.restaurant_id
        }
      }).then(function success(res) {
        toastr.success('Almacenado Exitosamente!', 'Categoria');
        return res.data;
      }, function error(err) {
        return err.data;
      });
    }

    function updateCategory(id, params) {
      return $http({
        method: 'PUT',
        url: '/api/v1/categories/' + id,
        data:{
          name: params.name
        }
      }).then(function success(res) {
        toastr.info('Actualizado Exitosamente!', 'Categoria');
        return res.config.data;
      }, function error(err) {
        return err.data;
      });
    }

    function removeCategory(id) {
      return $http({
        method: 'POST',
        url: '/api/v1/categories/'+ id + '/remove'
      }).then(function success(res) {
        toastr.info('Eliminado Exitosamente!', 'Categoria');
        return res.data;
      }, function error(err) {
        return err.data;
      });
    }

  }

})();
