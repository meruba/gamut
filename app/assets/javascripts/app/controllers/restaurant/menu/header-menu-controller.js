(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('HeaderRestController', HeaderRestController);

  function HeaderRestController() {
    var vmHeader = this;
    vmHeader.showForm = false;
    vmHeader.toggleShow = toggleShow

    function toggleShow() {
      vmHeader.showForm = !vmHeader.showForm;
    }
  }

})();
