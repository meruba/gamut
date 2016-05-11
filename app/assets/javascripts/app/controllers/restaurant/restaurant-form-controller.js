(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestFormController', RestFormController);

  function RestFormController(RestaurantService,
                              $state) {
    var vmRest = this;
    vmRest.submitForm = submitForm;
    vmRest.registrationForm = {}

    function submitForm() {
      RestaurantService.newRestaurant(vmRest.registrationForm).then(function(resp){
        $state.go('restaurant.list');
      });
    }
  }

})();
