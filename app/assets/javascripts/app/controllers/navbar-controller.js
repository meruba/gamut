(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('NavbarController', NavbarController);

  function NavbarController($scope, $state, $auth, toastr) {

    $scope.logout = function() {
      $auth.signOut()
        .then(function(resp) {
          $state.go('login');
          toastr.success('Signed out successfully!');
        });
    };

  }

})();
