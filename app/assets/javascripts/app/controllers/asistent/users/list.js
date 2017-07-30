(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UserList', UsersController);

  function UsersController($scope,
                          users) {
    var vm = this;
    vm.users = users || [];
    vm.limitShowRows = 12;
    vm.loadRows = 10;
    vm.showLoadButton = true;
    vm.loadMoreRows = loadMoreRows;

    function loadMoreRows(day) {
      vm.limitShowRows = vm.limitShowRows + vm.loadRows;
      vm.showLoadButton = vm.limitShowRows < vm.users.length;
    }
  }

})();
