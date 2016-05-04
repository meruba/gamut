(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('AuthController', AuthController);

  function AuthController($scope,
                          $state,
                          Auth) {

    $scope.login = function() {
      Auth.login($scope.user).then(function(){
        $state.go('home.users');
      }, function (response){
        var error = response.data.error;
        console.log(error);
        errors.deviseAlert(error);
      });
    };

    $scope.register = function() {
      Auth.register($scope.user).then(function (success){
        $state.go('home.users');
      }, function (response){
        console.log(response.data);
        var error = "Please ensure all items are filled in";
        console.log(error);
      });
    };
    
  }

})();
