(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestNewController', RestNewController);

  function RestNewController(toastr,
                            restaurantData,
                            RestaurantService,
                            $uibModalInstance) {
    var vm = this;
    vm.save = save;

    init();

    function init() {
      var form = {
        owner: '',
        name: '',
        email: '',
        address: '',
        telephone: ''
      };
      vm.rest = angular.copy(restaurantData.item) || form;
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      var action = {
          new: RestaurantService.newRestaurant,
          update: RestaurantService.updateRestaurant
        },
        key  = vm.rest.id ? 'update' : 'new';

      var service = action[key];

      service(vm.rest).then(function(resp){
        if (resp.errors) {
          errorsAlert(resp.errors);
        }else{
          cancel();
          restaurantData.callback(resp, key);
        }
      });
    }

    function errorsAlert(errors) {
      angular.forEach(errors, function(value, key) {
        toastr.error(value[0]);
      });
    }

  }

})();
