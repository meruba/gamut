(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UserController', UserController);

  function UserController(userData,
                            $state,
                            $auth,
                            toastr) {
    var vmUser = this;
    vmUser.userData = userData;

    init();

    function init(){
      vmUser.optionsBar = {
        data: vmUser.userData,
        maxValue: 100,
        height: 5
      }
    }
  }

})();
