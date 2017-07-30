(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UserList', UsersController);

  function UsersController($scope,
                          users) {
    var vm = this;
    var apiSearchUser = null;
    vm.users = users || [];
    vm.limitShowRows = 12;
    vm.loadRows = 10;
    vm.showLoadButton = true;
    vm.loadMoreRows = loadMoreRows;
    vm.searchText = null;

    vm.optionsSearch = {
      placeholder: 'search-user',
      results: usersResult,
      onRegisterApi: apiSearch,
      show: true,
      query: ''
    };

    function apiSearch(api){
      apiSearchUser = api;

      apiSearchUser.clearInput(function () {
        vm.searchText = '';
      });

      apiSearchUser.typing(function (text) {
        vm.searchText = text;
      });
    }

    function usersResult(data) {
      vm.users = data.search;
    }

    function loadMoreRows(day) {
      vm.limitShowRows = vm.limitShowRows + vm.loadRows;
      vm.showLoadButton = vm.limitShowRows < vm.users.length;
    }
  }

})();
