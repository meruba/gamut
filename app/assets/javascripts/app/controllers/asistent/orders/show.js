(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('ShowOrderCtrl', ShowOrderCtrl);

  function ShowOrderCtrl($scope,
                        order,
                        $state) {
    var vm = this;
    vm.order = order || [];

  }

})();
