(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('UpdateRestController', UpdateRestController);

  function UpdateRestController(restData,
                                $state,
                                RestaurantService,
                                toastr) {
    var vmRest = this;
    vmRest.rest = restData;
    vmRest.submitForm = submitForm;

    function submitForm() {
      RestaurantService.updateRestaurant(vmRest.rest).then(function(resp){
        if (resp.errors) {
          angular.forEach(resp.errors, function(value, key) {
            toastr.error(value[0]);
          });
        }else{
          $state.go('home');
        }
      });
    }

  }

})();
