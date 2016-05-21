(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UsersController', UsersController);

  function UsersController(usersData,
                          $scope) {
    var vmUsers = this;

    init();

    function init() {
      vmUsers.UserList = usersData.users;
      //update counter header
      $scope.vmHeader.totalUsers = vmUsers.UserList.length;
      //show counter header
      $scope.vmHeader.showCounter = true;
    }

  }

})();
