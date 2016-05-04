(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UsersController', UsersController);

  function UsersController($scope) {
    var vmUsers = this;
    vmUsers.test = 'MY USERS';
  }

})();
