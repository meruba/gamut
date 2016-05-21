(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuController', MenuController);

  function MenuController() {
    var vmMenu = this;
    vmMenu.saveMenu = saveMenu;

    init();

    function init() {
      vmMenu.restForm = {
        name: '',
        description: '',
        price: '',
        category_id: 2,
        restaurant_id: 1
      }
    }

    function saveMenu() {
      ProductService.newProduct(vmMenu.restForm).then(function(resp){
        if (resp.errors) {
          angular.forEach(resp.errors, function(value, key) {
            toastr.error(value[0]);
          });
        }else{
          addToMenu(resp);
        }
      });
    }

    function addToMenu(menu) {
      vmMenu.menu[menu.category_name].push(menu.product);
    }

  }

})();
