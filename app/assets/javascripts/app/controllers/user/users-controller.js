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
        placeholder: 'search-user',
        results: searchResults
      };
      //update counter header
      $scope.vmHeader.totalUsers = vmUsers.UserList.length;
      //show counter header
      $scope.vmHeader.showCounter = true;
    }

    function searchResults(data) {
      vmUsers.UserList = data.search;
      $scope.vmHeader.totalRest = data.meta.count;
    }

  }

})();
