(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuRestController', MenuRestController);

  function MenuRestController(restMenu,
                              categories,
                              toastr,
                              $auth,
                              ProductService) {

    var vmRest = this;
    vmRest.saveMenu = saveMenu;

    init();

    function init() {
      vmRest.menu = restMenu.products;
      vmRest.categories = categories;
      vmRest.restForm = {
        name: '',
        description: '',
        price: '',
        category_id: '',
        restaurant_id: $auth.user.restaurant_id
      };
    }

    function saveMenu() {
      vmRest.restForm.category_id = vmRest.restForm.category.id;
      ProductService.newProduct(vmRest.restForm).then(function(resp){
        if (resp.errors) {
          angular.forEach(resp.errors, function(value, key) {
            toastr.error(value[0]);
          });
        }else{
          addMenu(resp);
        }
      });
    }

    function addMenu(menu) {
      /*build object to show*/
      if ( vmRest.menu.hasOwnProperty(menu.category_name) ) {
        vmRest.menu[menu.category_name].push(menu.product);
      }else{
        vmRest.menu[menu.category_name] = [menu.product];
      }
      clearForm();
    }

    function clearForm() {
      vmRest.restForm.name = '';
      vmRest.restForm.description = '';
      vmRest.restForm.price = '';
    }
  }

})();
