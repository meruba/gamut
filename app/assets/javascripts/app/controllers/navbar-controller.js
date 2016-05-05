(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('NavbarController', NavbarController);

  function NavbarController($state,
                            $auth,
                            toastr) {

    var vmNav = this;
    vmNav.logout = logout;

    function logout() {
      $auth.signOut()
        .then(function(resp) {
          $state.go('login');
          toastr.success('Signed out successfully!');
        });
    }

  }

})();
