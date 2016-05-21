(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuRestController', MenuRestController);

  function MenuRestController(restMenu) {

    var vmRest = this;

    init();

    function init() {
      vmRest.menu = restMenu.products;
    }

  }

})();
