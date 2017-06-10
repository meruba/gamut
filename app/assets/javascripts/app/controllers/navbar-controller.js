(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('NavbarController', NavbarController);

  function NavbarController($state,
                            $auth,
                            $rootScope,
                            toastr) {

    var vmNav = this;
    vmNav.logout = logout;

    vmNav.navbars = {
      asistent: 'shared/navbar/asistent.html',
      admin: 'shared/navbar/default.html'
    }

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        $state.current = toState;
        vmNav.showNav = $state.current.name === 'login' || $state.current.name === 'register';
      }
    );

    function logout() {
      $auth.signOut()
        .then(function(resp) {
          $state.go('login');
        });
    }

  }

})();
