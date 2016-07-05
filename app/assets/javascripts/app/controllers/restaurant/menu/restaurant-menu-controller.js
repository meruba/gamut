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
    vmRest.publicItem = publicItem;
    vmRest.newCategory = newCategory;
    vmRest.saveCategory = saveCategory;
    vmRest.selectItem = selectItem;

    init();

    function init() {
      vmRest.menu = restMenu.products;
      vmRest.emptyResults = jQuery.isEmptyObject(vmRest.menu);
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
      ProductService.updateProduct(vmRest.restForm).then(function(product){
        if (product.errors) {
          errorsAlert(product.errors);
        }else{
          var id = vmRest.restForm.id;
          vmRest.menu[vmRest.itemEdit.category][vmRest.itemEdit.position] = product;
          vmRest.menu[vmRest.itemEdit.category][vmRest.itemEdit.position].id = id;
          vmRest.updateMenu = false;
          $scope.vmHeader.showForm = false;
          clearForm();
        }
      });
    }

    function editItem(item, category, index) {
      vmRest.itemEdit = {
        item: item,
        category: category,
        position: index
      };
      var categoryEdit = {
        id: item.category_id,
        name: category
      };
      /*update toggle buttons*/
      vmRest.updateMenu = true;
      $scope.vmHeader.showForm = true;
      /*set values to form*/
      vmRest.restForm = angular.copy(item);
      vmRest.restForm.category = categoryEdit;
    }

    function removeItem(item) {
      ProductService.removeProduct(item.id).then(function(resp){
        if (resp.errors) {
          errorsAlert(resp.errors);
        }else{
          item.removed = true;
        }
      });
    }

    function addMenu(menu) {
      /*build object to show*/
      if ( vmRest.menu.hasOwnProperty(menu.category_name) ) {
        vmRest.menu[menu.category_name].unshift(menu.product);
      }else{
        vmRest.menu[menu.category_name] = [menu.product];
      }
      clearForm();
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

    function publicItem(item) {
      ProductService.publicProduct(item.id).then(function(resp){
        if (resp.errors) {
          errorsAlert(resp.errors);
        }else{
          item.public = resp.product.public;
        }
      });
    }

    function selectItem(item) {
      item.selected = (item.selected === undefined) ? true : !item.selected;
      if (vmRest.itemSelected) {
        if (vmRest.itemSelected.id === item.id) return;
        vmRest.itemSelected.selected = false;
      }
      vmRest.itemSelected = item;
    }

    function clearForm() {
      vmRest.restForm.name = '';
      vmRest.restForm.description = '';
      vmRest.restForm.price = '';
    }

    function errorsAlert(errors) {
      angular.forEach(errors, function(value, key) {
        toastr.error(value[0]);
      });
    }
  }

})();
