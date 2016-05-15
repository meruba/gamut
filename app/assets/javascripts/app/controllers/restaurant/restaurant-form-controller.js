(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestFormController', RestFormController);

  function RestFormController(RestaurantService,
                              $state,
                              toastr) {
    var vmRest = this;
    vmRest.submitForm = submitForm;
    vmRest.restForm = {
      owner: '',
      name: '',
      email: '',
      address: '',
      telephone: ''
    }

    function submitForm() {
      RestaurantService.newRestaurant(vmRest.restForm).then(function(resp){
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
