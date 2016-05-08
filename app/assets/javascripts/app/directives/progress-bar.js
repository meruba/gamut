(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('progresiveBar', progresiveBar);

  function progresiveBar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/progress-bar/progress-bar.html',
      scope: {
        options: '='
      },
      controller: barController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function barController($scope){

    var vm = this;
    vm.data = vm.options.data || {};
    vm.height = (vm.options.height || 20) + 'px';
    vm.maxValue = vm.options.maxValue || 100;
    vm.percentage = 0;

    init();

    function init(){
      completeData(vm.data);
    }

    function completeData(data) {
      var fillFields = 0;
      var totalfields = 0;
      angular.forEach(data, function(value, key){
        if (key !== 'id') {
          totalfields = 1 + totalfields;
          if (value) {
            fillFields = 1 + fillFields;
          }
        }
      });
      vm.percentage = Math.round((fillFields/totalfields) * vm.maxValue);
      colors();
    }

    function colors() {
      if (vm.percentage < 25) {
        vm.type = 'danger';
      } else if (vm.percentage < 50) {
        vm.type = 'warning';
      } else if (vm.percentage < 75) {
        vm.type = 'info';
      } else {
        vm.type = 'success';
      }
    }

    $scope.$on('progress-bar:update', function(ev, data){
      completeData(data);
    });

  }

})();
