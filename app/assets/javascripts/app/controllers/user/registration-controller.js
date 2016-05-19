(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RegistrationController', RegistrationController);

  function RegistrationController($scope, $state, $auth, toastr) {

    $scope.$on('auth:registration-email-error', function(ev, reason) {
      angular.forEach(reason.errors.full_messages, function(value, key) {
        toastr.error(value);
      })
    });

    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.userForm)
        .then(function() {
          $auth.submitLogin({
            email: $scope.userForm.email,
            name: $scope.userForm.name,
            password: $scope.userForm.password
          })
          $state.go('home');
          toastr.success('Registrado exitosamente!');
        });
    };

  }

})();
