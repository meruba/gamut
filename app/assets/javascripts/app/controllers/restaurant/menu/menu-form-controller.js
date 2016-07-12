(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuController', MenuController);

  function MenuController(toastr,
                          menuData,
                          ProductService,
                          CategoryService,
                          $uibModalInstance,
                          $auth,
                          $scope) {
    var vmMenu = this;
    vmMenu.ok = ok;
    vmMenu.cancel = cancel;
    vmMenu.save = save;
    vmMenu.remove = remove;
    vmMenu.publicItem = publicItem;
    vmMenu.saveCategory = saveCategory;
    vmMenu.newCategory = newCategory;

    init();

    function init() {
      var itemCache = angular.copy(menuData.item);
      vmMenu.categories = menuData.categories;
      vmMenu.item = itemCache;
      vmMenu.item.category = itemCache.category;
      vmMenu.editItem = itemCache.editItem ? itemCache.editItem : false;
    }

    function ok() {
      $uibModalInstance.close();
    };

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    };

    function save() {
      var action = {
        new: ProductService.newProduct,
        update: ProductService.updateProduct
      };
      var key  = vmMenu.editItem ? 'update' : 'new';
      var service = action[key];
      vmMenu.item.restaurant_id =  $auth.user.restaurant_id
      vmMenu.item.category_id = vmMenu.item.category.id;
      service(vmMenu.item).then(function(product){
        if (product.errors) {
          errorsAlert(product.errors);
        }else{
          refreshMenu(product, key);
          cancel();
        }
      });
    }

    function refreshMenu(item, kind) {
      if (kind === 'new') {
        addMenu(item);
      }else{
        updateItem(vmMenu.item);
      }
    }

    function addMenu(item) {
      var menu  = menuData.menu;
      /*build object to show*/
      if (menu.hasOwnProperty(item.category_name) ) {
        menu[item.category_name].unshift(item.product);
      }else{
        menu[item.category_name] = [item.product];
      }
    }

    function updateItem(item) {
      var menu  = menuData.menu;
      var itemOld  = menuData.item;
      menu[itemOld.category.name].splice(itemOld.position, 1);
      if (menu.hasOwnProperty(item.category.name) ) {
        menu[item.category.name].push(item);
      }else{
        menu[item.category.name] = [item];
      }
    }

    function publicItem(item) {
      ProductService.publicProduct(item.id).then(function(resp){
        if (resp.errors) {
          errorsAlert(resp.errors);
        }else{
          menuData.item.public = resp.product.public;
          cancel();
        }
      });
    }

    function remove(item) {
      ProductService.removeProduct(item.id).then(function(resp){
        if (resp.errors) {
          errorsAlert(resp.errors);
        }else{
          menuData.item.removed = true;
          cancel();
        }
      });
    }

    function errorsAlert(errors) {
      angular.forEach(errors, function(value, key) {
        toastr.error(value[0]);
      });
    }

    function saveCategory() {
      var data = {
        name: vmMenu.category.new,
        restaurant_id: $auth.user.restaurant_id
      }
      CategoryService.newCategory(data).then(function (resp) {
        if (resp.errors) {
          errorsAlert(resp.errors);
        }else{
          /*pending success */
        }
      });
    }

    function newCategory() {
      vmMenu.toggleShow = !vmMenu.toggleShow;
    }

  }

})();
