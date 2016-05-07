(function () {
'use strict';

  angular
    .module('app.services')
    .factory('UserService', UserService);

  function UserService($http) {
    var service = {
      users: users,
      user: user
    };

    return service;

    function users() {
      return $http({
        method: 'GET',
        url: '/api/v1/users'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function user(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/users/' + id
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }
  }

})();
