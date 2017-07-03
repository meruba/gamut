(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UserNewModalController', UserNewModalController);

  function UserNewModalController(toastr,
                                UserService,
                                userData,
                                $uibModalInstance,
                                $scope) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.save = save;

    init();

    function init() {
      vm.userForm = null;
    }

    function ok() {
      $uibModalInstance.close();
    };

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };

    function save() {
      UserService.newCustomer(vm.userForm).then(function(user){
        if (user.errors) {
          errorsAlert(user.errors);
        }else{
          cancel();
          userData.callback(user);
        }
      });
    }

    function errorsAlert(errors) {
      angular.forEach(errors, function(value, key) {
        toastr.error(value[0]);
      });
    }
  }

})();
