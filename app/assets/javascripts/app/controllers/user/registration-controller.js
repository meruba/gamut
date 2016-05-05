(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RegistrationController', RegistrationController);

  function RegistrationController($scope, $state, $auth, toastr) {

    $scope.$on('auth:registration-email-error', function(ev, reason) {
      console.log(reason);
      angular.forEach(reason.errors.full_messages, function(value, key) {
        toastr.error(value);
      })
    });

    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function() {
          $auth.submitLogin({
            email: $scope.registrationForm.email,
            username: $scope.registrationForm.username,
            password: $scope.registrationForm.password
          })
          $state.go('home');
          toastr.success('Registered successfully!');
        });
    };

  }

})();
