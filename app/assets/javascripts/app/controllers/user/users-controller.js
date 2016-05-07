(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UsersController', UsersController);

  function UsersController(usersData) {
    var vmUsers = this;
    vmUsers.UserList = usersData.users;
    vmUsers.totalUsers = vmUsers.UserList.length;
  }

})();
