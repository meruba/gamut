(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('MenuController', MenuController);

  function MenuController(categories) {
    var vmMenu = this;
    vmMenu.categories = categories;
    vmMenu.selectCategory = null;
    vmMenu.saveMenu = saveMenu;
    vmMenu.addMenu = addMenu;
    vmMenu.removeItem = removeItem;
    vmMenu.editItem = editItem;

    init();

    function init() {
      vmMenu.restForm = {
        name: '',
        description: '',
        price: '',
        category_id: '',
        restaurant_id: ''
      };
      vmMenu.allMenu = {};
      vmMenu.emptyList = true;
    }

    function addMenu(menu, restId) {
      var menuCache = angular.copy(menu);
      menuCache.restaurant_id = restId;
      menuCache.category_id = vmMenu.selectCategory.id;
      /*build object to show*/
      if (vmMenu.allMenu.hasOwnProperty(vmMenu.selectCategory.name)) {
        vmMenu.allMenu[vmMenu.selectCategory.name].push(menuCache);
      }else{
        vmMenu.allMenu[vmMenu.selectCategory.name] = [menuCache];
      }
      vmMenu.restForm = {};
      vmMenu.emptyList = false;
    }

    function removeItem(key, item) {
      var index = vmMenu.allMenu[key].indexOf(item);
      vmMenu.allMenu[key].splice(index, 1);
      console.log('eliminado: ', vmMenu.allMenu);
    }

    function editItem(key, item) {
      vmMenu.selectCategory.id = item.category_id;
      vmMenu.selectCategory.name = key;
      vmMenu.restForm = item;
    }


    function saveMenu() {
      // ProductService.newProduct(vmMenu.restForm).then(function(resp){
      //   if (resp.errors) {
      //     angular.forEach(resp.errors, function(value, key) {
      //       toastr.error(value[0]);
      //     });
      //   }else{
      //     addToMenu(resp);
      //   }
      // });
    }

  }

})();
