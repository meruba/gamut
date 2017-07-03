(function () {
'use strict';

  angular
    .module('app.services')
    .factory('UserService', UserService);

  function UserService($http) {
    var service = {
      users: users,
      user: user,
      searchUsers: searchUsers,
      searchCustomers: searchCustomers,
      restaurant: restaurant,
      activeUser: activeUser,
      newUser: newUser,
      newCustomer: newCustomer,
      customers: customers
    };

    return service;

    function newUser(user) {
      return $http({
        method: 'POST',
        url: '/api/v1/users',
        data: {
          name: user.name,
          identification: user.identification,
          email: user.email,
          address: user.address,
          telephone: user.telephone,
          has_account: false
        }
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function newCustomer(user) {
      return $http({
        method: 'POST',
        url: '/api/v1/users/new_customer',
        data: {
          name: user.name,
          identification: user.identification,
          email: user.email,
          address: user.address,
          telephone: user.telephone
        }
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        return err.data;
      });
    }

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

    function searchUsers(query) {
      return $http({
        method: 'GET',
        url: '/api/v1/search/user',
        params: {
          query: query
        }
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function searchCustomers(query) {
      return $http({
        method: 'GET',
        url: '/api/v1/search/customer',
        params: {
          query: query
        }
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function restaurant(id) {
      return $http({
        method: 'GET',
        url: '/api/v1/users/' + id + '/restaurant'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function activeUser(id) {
      return $http({
        method: 'POST',
        url: '/api/v1/users/' + id + '/active'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }

    function customers() {
      return $http({
        method: 'GET',
        url: '/api/v1/users/customers'
      }).then(function success(res) {
        return res.data;
      }, function error(err) {
        console.error('ERR', err);
      });
    }
  }

})();
