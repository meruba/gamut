(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('DialogConfirmController', DialogConfirmController);

  function DialogConfirmController($uibModalInstance, dialogOptions) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;

    function ok() {
      dialogOptions.ok(dialogOptions.data);
      $uibModalInstance.close();
    };

    function cancel() {
      $uibModalInstance.dismiss('cancel');
      dialogOptions.cancel(dialogOptions.data);
    };
  }

})();
