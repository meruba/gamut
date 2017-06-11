(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UserList', UsersController);

  function UsersController($scope,
                          users) {
    var vm = this;
    vm.users = users || [];
  }

})();
