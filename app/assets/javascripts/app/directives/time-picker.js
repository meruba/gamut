(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('timePicker', timePicker);

  function timePicker() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/timepicker/timepicker.html',
      scope: {
        options: '=',
      },
      controller: pickerController,
      controllerAs: 'tp',
      bindToController: true
    };

    return directive;
  }

  pickerController.$inject = ['$scope'];

  function pickerController($scope){

    var tp = this;
    tp.toggleTime = toggleTime;


    init();

    function init(){
      tp.hours = [1,2,3,4,5,6,7,8,9,10,11,12];
      tp.mins = [0,5,10,15,20,25,30,35,40,45,50,55,60];
      tp.period = ['AM','PM'];
      tp.selectPeriod = tp.period[0];
    }

    function toggleTime() {
      tp.selectPeriod = tp.selectPeriod === tp.period[0] ? tp.period[1] : tp.period[0];
    }

  }

})();
