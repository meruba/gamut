(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuController', MenuController);

  function MenuController(categories, $uibModalInstance) {
    var vmMenu = this;
    vmMenu.ok = ok;
    vmMenu.cancel = cancel;
    vmMenu.categories = categories;

    function ok() {
      $uibModalInstance.close();
    };

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };

  }

})();
