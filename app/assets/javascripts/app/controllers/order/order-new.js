(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('OrderNewController', OrderNewController);

  function OrderNewController(restData, $scope) {
    var vmOrder = this;
    vmOrder.showMenu = false;
    vmOrder.itemsSelected = [];
    vmOrder.totalOrder = 0;
    vmOrder.deliveryPrice = 0;

    vmOrder.calculate = calculate;
    vmOrder.sumValues = sumValues;

    vmOrder.restaurants = restData.restaurants;

    function calculate(item) {
      item.value = item.value || 1;
      item.totalItem = item.value * item.price;
      /*round 2 decimal*/
      item.totalItem = Math.round(item.totalItem * 100) / 100;
      sumValues();
    }

    function sumValues() {
      vmOrder.totalOrder = 0;
      angular.forEach(vmOrder.itemsSelected, function(item) {
        vmOrder.totalOrder = vmOrder.totalOrder + (item.totalItem || item.price) ;
      });
      /*round 2 decimal*/
      vmOrder.totalOrder = vmOrder.totalOrder + vmOrder.deliveryPrice;
      vmOrder.totalOrder = Math.round(vmOrder.totalOrder * 100) / 100;
    }

    $scope.$on('_ORDER_FIELDS', function(ev, data){
       vmOrder.itemsSelected = data;
       sumValues();
    });

  }

})();
