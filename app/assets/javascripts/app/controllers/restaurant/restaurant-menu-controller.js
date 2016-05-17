(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuRestController', MenuRestController);

  function MenuRestController(restMenu) {
    var vmRest = this;
    vmRest.menu = restMenu.products;
  }

})();
