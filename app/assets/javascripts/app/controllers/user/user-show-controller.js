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
    vmUser.updateUser = updateUser;

    function updateUser() {
      var user = {
        name: vmUser.userData.name,
        email: vmUser.userData.email,
        username: vmUser.userData.username
      }
      $auth.updateAccount(user)
        .then(function(resp) {
          $state.go('user.list');
        })
        .catch(function(resp) {
          angular.forEach(resp.data.errors.full_messages, function(value, key) {
            toastr.error(value);
          })
        });
    }
  }

})();
