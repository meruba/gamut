(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('HeaderUserController', HeaderUserController);

  function HeaderUserController() {
    var vmHeader = this;
    vmHeader.totalUsers;
    vmHeader.showCounter = true;
  }

})();
