(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UsersController', UsersController);

  function UsersController(usersData,
                          $scope,
                          UserService) {
    var vmUsers = this;
    vmUsers.search = search;

    init();

    function init() {
      vmUsers.UserList = usersData.users;
      vmUsers.searchForm = false;
      vmUsers.query = '';
      //update counter header
      $scope.vmHeader.totalUsers = vmUsers.UserList.length;
      //show counter header
      $scope.vmHeader.showCounter = true;
    }

    function search(query) {
      UserService.searchUsers(query).then(function(resp){
        vmUsers.UserList = resp.search;
        $scope.vmHeader.totalUsers = resp.meta.count;
      });
    }

    $scope.$on('_SHOW_SEARCH_USER_',function (ev, show) {
      vmUsers.searchForm = show;
      if (!vmUsers.searchForm && vmUsers.query.length !== 0) {
        vmUsers.query = '';
        search(vmUsers.query);
      }
    });


  }

})();
