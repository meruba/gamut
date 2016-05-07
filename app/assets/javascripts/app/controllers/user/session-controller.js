(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('SessionController', SessionController);

  function SessionController($scope,
                              $state,
                              $auth,
                              toastr) {

    $scope.$on('auth:login-success', function(ev) {
      $state.go('user.list');
    });

    $scope.$on('auth:login-error', function(ev, reason) {
      toastr.error(reason.errors[0]);
    });

    $scope.$on('auth:account-update-error', function(ev, reason) {
      toastr.error(reason.errors[0]);
    });

    $scope.$on('auth:account-update-success', function(ev) {
      $state.go('user.list');
    });
  }

})();
