(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuRestController', MenuRestController);

  function MenuRestController(restMenu,
                              $uibModal) {

    var vmRest = this;
    vmRest.menu = restMenu.products;
    vmRest.openModal = openModal;

    function openModal() {

      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'restaurants/menu/menu.html',
        controller: 'MenuController as vmMenu',
        resolve: {
          categories: function(RestaurantService) {
            return RestaurantService.categories()
              .then(function(data) {
                return data;
            });
          }
        }
      });
    }

  }

})();
