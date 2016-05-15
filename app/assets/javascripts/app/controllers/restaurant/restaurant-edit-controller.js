(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UpdateRestController', UpdateRestController);

  function UpdateRestController(restData,
                            $state,
                            $auth,
                            $scope,
                            toastr) {
    var vmRest = this;
    vmRest.restData = restData;
    vmRest.updateRest = updateRest;

    init();

    function updateRest() {
      $auth.updateAccount(vmRest.restData)
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

  }

})();
