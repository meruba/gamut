(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('HeaderUserController', HeaderUserController);

  function HeaderUserController($rootScope) {
    var vmHeader = this;
    vmHeader.totalUsers;
    vmHeader.showCounter = true;
    vmHeader.searchForm = false;
    vmHeader.toggleSearch = toggleSearch;

    function toggleSearch() {
      vmHeader.searchForm = !vmHeader.searchForm;
      $rootScope.$broadcast('_SHOW_SEARCH_USER_',vmHeader.searchForm);
    }

  }

})();
