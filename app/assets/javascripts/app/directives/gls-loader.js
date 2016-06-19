(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('glsLoader', glsLoader);

  function glsLoader() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/gls-loader/gls-loader.html',
      scope: {
        loaded: '='
      },
      controller: loaderController,
      controllerAs: 'ld',
      bindToController: true
    };

    return directive;
  }

  function loaderController(){

    var ld = this;

    init();

    function init(){
    }
  }

})();
