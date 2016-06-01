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
                              ProductService,
                              CategoryService) {

    var vmRest = this;
    vmRest.saveForm = saveForm;
    vmRest.editItem = editItem;
    vmRest.removeItem = removeItem;
    vmRest.newCategory = newCategory;
    vmRest.saveCategory = saveCategory;

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
      vmRest.showCategory = false;
      //update header controller values
      $scope.vmHeader.showNewMenu = true;
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
      ProductService.newProduct(vmRest.restForm).then(function(product){
        if (product.errors) {
          errorsAlert(product.errors);
        }else{
          addMenu(product);
        }
      });
    }

    function editMenu() {
      ProductService.updateProduct(vmRest.restForm.id, vmRest.restForm).then(function(product){
        if (product.errors) {
          errorsAlert(product.errors);
        }else{
          clearForm();
          vmRest.itemEdit = product;
          vmRest.updateMenu = false;
          $scope.vmHeader.showForm = false;
        }
      });
    }

    function editItem(item) {
      var itemCache = angular.copy(item);
      vmRest.itemEdit = item;
      vmRest.updateMenu = true;
      $scope.vmHeader.showForm = true;
      vmRest.restForm = itemCache;
    }

    function removeItem(ev, item) {
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

    function newCategory() {
      vmRest.showCategory = !vmRest.showCategory;
    }

    function saveCategory() {
      CategoryService.newCategory(vmRest.category).then(function(category){
        if (category.errors) {
          errorsAlert(category.errors);
        }else{
          vmRest.showCategory = false;
          vmRest.categories.push(category);
          vmRest.category.name = '';
          vmRest.restForm.category = category;
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
