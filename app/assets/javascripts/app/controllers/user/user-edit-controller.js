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
    vmUser.userData = userData;
    vmUser.updateUser = updateUser;
    vmUser.completeDataLive = completeDataLive;

    init();

    function init(){
      vmUser.optionsBar = {
        data: vmUser.userData,
        showLabel: true,
        maxValue: 100,
        height: 5
      }
    }

    function updateUser() {
      $auth.updateAccount(vmUser.userData)
        .then(function(resp) {
          $state.go('user.list');
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
