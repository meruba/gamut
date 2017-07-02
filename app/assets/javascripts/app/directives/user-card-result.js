(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('userCardResult', userCardResult);

  function userCardResult() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/user-card-result/user-card-result.html',
      scope: {
        options: '='
      },
      controller: userCardController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function userCardController(){

    var vm = this;

    init();

    function init(){
      vm.user = vm.options.user || {};
    }
  }

})();
