(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('RestaurantController', RestaurantController);

  function RestaurantController(restData,
                                UserService,
                                $scope,
                                toastr) {
    var vmRest = this;
    vmRest.toggleAccount = toggleAccount;

    init();

    function init() {
      vmRest.rest = restData;
      vmRest.imageOptions = {
        image: vmRest.rest.logo,
        identicon: vmRest.rest.email,
        url: '/api/v1/restaurants/'+ vmRest.rest.id +'/upload_image'
      };
      //update header controller values
      $scope.vmHeader.showNewRest = false;
      $scope.vmHeader.showNewMenu = false;
      $scope.vmHeader.onlyRests = false;
      $scope.vmHeader.searchForm = false;
    }

    function toggleAccount() {
      UserService.activeUser(vmRest.rest.user_id).then(function(user){
        if (user.errors) {
          angular.forEach(resp.errors, function(value, key) {
            toastr.error(value[0]);
          });
        }else{
          var typeAlert = user.is_active ? 'info' : 'warning';
          var message = user.is_active ? 'Ha sido activado' : 'Ha sido deshabilitado';
          toastr[typeAlert](message,'Usuario');
          vmRest.rest.user_active = user.is_active;
        }
      });
    }

  }

})();
