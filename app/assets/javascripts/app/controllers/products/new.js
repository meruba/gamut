(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('NewProducController', NewProducController);

  function NewProducController(toastr,
                              menuData,
                              ProductService,
                              CategoryService,
                              $uibModalInstance,
                              $auth,
                              $scope) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.save = save;
    vm.remove = remove;
    vm.publicItem = publicItem;
    vm.saveCategory = saveCategory;
    vm.selectCategory = selectCategory;
    vm.newCategory = newCategory;

    init();

    function init() {
      var itemCache = angular.copy(menuData.item);
      vm.item = itemCache;
      vm.categories = menuData.categories;
      vm.activeCategory = !vm.categories.length > 0;;
      vm.actionCategory = vm.activeCategory;
      vm.editItem = itemCache.editItem ? itemCache.editItem : false;
      configCategory(vm.item);
    }

    function configCategory(item) {
      if (item.hasOwnProperty('category')) {
        vm.categories.find(function(c){
          if(c.id === item.category.id){
            c.selected = true;
            vm.nameCategory = c.name;
            vm.selectedCategory = c;
            return;
          }
        });
      }
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
      var key  = vm.editItem ? 'update' : 'new';
      var service = action[key];
      vm.item.restaurant_id =  $auth.user.restaurant_id
      vm.item.category_id = vm.item.category ?
                                vm.item.category.id : vm.selectedCategory.id;
      service(vm.item).then(function(product){
        if (product.errors) {
          errorsAlert(product.errors);
        }else{
          refreshMenu(product, key);
          cancel();
          menuData.callback();
        }
      });
    }

    function refreshMenu(item, kind) {
      if (kind === 'new') {
        addMenu(item);
      }else{
        updateItem(vm.item);
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
      updateRemove(itemOld);
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
          updateRemove(item);
          cancel();
        }
      });
    }

    function updateRemove(item) {
      menuData.menu[item.category.name].splice(item.position, 1);
      if (menuData.menu[item.category.name].length === 0) {
        delete menuData.menu[item.category.name];
      }
      menuData.callback();
    }

    function errorsAlert(errors) {
      angular.forEach(errors, function(value, key) {
        toastr.error(value[0]);
      });
    }

    /*Category methods*/

    function saveCategory() {
      var data = {
        name: vm.nameCategory,
        restaurant_id: $auth.user.restaurant_id
      }
      CategoryService.newCategory(data).then(function (category) {
        if (category.errors) {
          errorsAlert(category.errors);
        }else{
          successCategory(category);
        }
      });
    }

    function successCategory(category) {
      category.selected = true;
      if (vm.selectedCategory) {
        vm.selectedCategory.selected = false;
      }
      vm.selectedCategory = category;
      vm.categories.push(category);
      vm.activeCategory = false;
    }

    function selectCategory(category) {
      if (vm.selectedCategory) {
        vm.selectedCategory.selected = false;
      }
      vm.selectedCategory = category;
      vm.item.category = vm.selectedCategory;
      category.selected = true;
      vm.nameCategory = category.name;
      vm.activeCategory = false;
    }

    function newCategory() {
      vm.activeCategory = !vm.activeCategory;
      vm.actionCategory = vm.activeCategory; //true = new Category
      vm.nameCategory = (!vm.activeCategory && vm.selectedCategory) ?
                              vm.selectedCategory.name : '';
    }

  }

})();
