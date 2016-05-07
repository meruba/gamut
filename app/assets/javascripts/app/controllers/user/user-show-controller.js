(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UserController', UserController);

  function UserController(userData) {
    var vmUser = this;
    vmUser.userData = userData;
  }

})();
