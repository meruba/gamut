(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('productCardResult', productCardResult);

  function productCardResult() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/product-card-result/product-card-result.html',
      scope: {
        options: '='
      },
      controller: productCardController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function productCardController(){
    var vm = this;

    init();

    function init(){
      vm.product = vm.options.product || {};
    }
  }

})();
