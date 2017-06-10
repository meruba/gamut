(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UserList', UsersController);

  function UsersController($scope,
                          UserService) {
    var vm = this;

    init();

    function init() {
    }

  }

})();
