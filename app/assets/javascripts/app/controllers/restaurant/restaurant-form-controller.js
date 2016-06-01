(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestFormController', RestFormController);

  function RestFormController(RestaurantService,
                              $state,
                              $scope,
                              toastr) {
    var vmRest = this;
    vmRest.submitForm = submitForm;

    init();

    function init() {
      vmRest.restForm = {
        owner: '',
        name: '',
        email: '',
        address: '',
        telephone: ''
      };
      //update header controller values
      $scope.vmHeader.showNewRest = false;
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
