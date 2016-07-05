(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UsersController', UsersController);

  function UsersController(usersData,
                          $scope,
                          UserService) {
    var vmUsers = this;

    init();

    function init() {
      vmUsers.UserList = usersData.users;
      vmUsers.optionsSearch = {
        service: UserService.searchUsers,
        placeholder: 'search-user'
      };
      //update counter header
      $scope.vmHeader.totalUsers = vmUsers.UserList.length;
      //show counter header
      $scope.vmHeader.showCounter = true;
    }

    $scope.$on('_SEARCH_RESULTS_',function (ev, data) {
      vmUsers.UserList = data.search;
      $scope.vmHeader.totalRest = data.meta.count;
    });

  }

})();
