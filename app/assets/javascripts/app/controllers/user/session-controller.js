(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('SessionController', SessionController);

  function SessionController($scope, $state, $auth, toastr) {

    $scope.$on('auth:login-success', function() {
      $state.go('home.users');
      toastr.success('Signed in successfully!');
    });

    $scope.$on('auth:login-error', function(ev, reason) {
      toastr.error(reason.errors[0]);
    });
  }

})();
