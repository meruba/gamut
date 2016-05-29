(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuRestController', MenuRestController);

  function MenuRestController(restMenu,
                              categories,
                              toastr,
                              $auth,
                              $scope,
                              ProductService) {

    var vmRest = this;
    vmRest.saveForm = saveForm;
    vmRest.saveMenu = saveMenu;
    vmRest.editMenu = editMenu;
    vmRest.editItem = editItem;
    vmRest.removeItem = removeItem;

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
      vmRest.updateMenu = false;
    }

    function saveForm() {
      if (vmRest.updateMenu) {
        editMenu();
      }else{
        saveMenu();
      }
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

    function editMenu() {
      ProductService.updateProduct(vmRest.restForm.id, vmRest.restForm).then(function(resp){
        if (resp.errors) {
          angular.forEach(resp.errors, function(value, key) {
            toastr.error(value[0]);
          });
        }else{
          clearForm();
          vmRest.itemEdit = resp;
          vmRest.updateMenu = false;
        }
      });
    }

    function removeItem(item) {
      ProductService.removeProduct(item.id).then(function(resp){
        if (resp.errors) {
          angular.forEach(resp.errors, function(value, key) {
            toastr.error(value[0]);
          });
        }else{
          item.removed = true;
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

    function editItem(item) {
      var itemCache = angular.copy(item);
      vmRest.itemEdit = item;
      vmRest.updateMenu = true;
      $scope.vmHeader.showForm = true;
      vmRest.restForm = itemCache;
    }
  }

})();
