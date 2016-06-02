(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UpdateUserController', UpdateUserController);

  function UpdateUserController(userData,
                            $state,
                            $auth,
                            $scope,
                            toastr) {
    var vmUser = this;
    vmUser.updateUser = updateUser;
    vmUser.completeDataLive = completeDataLive;

    init();

    function init(){
      vmUser.userData = {
        name: userData.name,
        email: userData.email,
        identification: userData.identification,
        username: userData.username,
        address: userData.address,
        telephone: userData.telephone
      };
      vmUser.optionsBar = {
        data: vmUser.userData,
        showLabel: true,
        maxValue: 100,
        height: 5
      };
      //show counter header
      $scope.vmHeader.showCounter = false;
    }

    function updateUser() {
      $auth.updateAccount(vmUser.userData)
        .then(function(resp) {
          toastr.info("Campos Actualizados");
          $state.go('home');
        })
        .catch(function(resp) {
          angular.forEach(resp.data.errors.full_messages, function(value, key) {
            toastr.error(value);
          })
        });
    }

    function completeDataLive(data) {
      $scope.$broadcast('progress-bar:update', data);
    }
  }

})();
