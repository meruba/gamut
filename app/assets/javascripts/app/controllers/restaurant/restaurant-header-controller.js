(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('HeaderRestController', HeaderRestController);

  function HeaderRestController($state) {

    var vmHeader = this;
    vmHeader.toggleShow = toggleShow

    init();

    function init() {
      vmHeader.showNewMenu = ($state.current.name === 'restaurant.menu');
      vmHeader.showNewRest = ($state.current.name === 'restaurant.list');
    }

    function toggleShow() {
      vmHeader.showForm = !vmHeader.showForm;
    }

  }

})();
