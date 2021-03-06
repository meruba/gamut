(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuRestController', MenuRestController);

  function MenuRestController(restMenu,
                              $uibModal,
                              $scope,
                              actions) {
    var vmRest = this;
    vmRest.newItem = newItem;
    vmRest.editItem = editItem;
    actions.newItem = newItem;


    init();

    function init() {
      vmRest.menu = restMenu.products;
      vmRest.emptyResults = jQuery.isEmptyObject(vmRest.menu);
      /*update header controller values*/
      $scope.vmHeader.showNewMenu = true;
      /*breadcrumbs name*/
      vmRest.rest = {};
      vmRest.rest.name = restMenu.name;
    }

    function newItem() {
      var item = {};
      configModal(item, vmRest.menu);
    }

    function editItem(data, category, position) {
      var item = data;
      item.category = {
        id: item.category_id,
        name: category
      };
      item.editItem = true;
      item.position = position;
      configModal(item, vmRest.menu);
    }

    function configModal(item, menu) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'restaurants/menu/form.html',
        controller: 'MenuController as vmMenu',
        resolve: {
          menuData: function(RestaurantService) {
            return RestaurantService.categories()
              .then(function(data) {
                return {
                  categories: data,
                  item: item,
                  menu: menu,
                  callback: successItem
                };
            });
          }
        }
      });
    }

    function successItem() {
      vmRest.emptyResults = jQuery.isEmptyObject(vmRest.menu);
    }

  }

})();
