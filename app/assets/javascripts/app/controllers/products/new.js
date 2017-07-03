(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('NewProductController', NewProductController);

  function NewProductController(toastr,
                                ProductService,
                                productData,
                                $uibModalInstance,
                                $auth,
                                $scope) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.save = save;

    init();

    function init() {
      vm.item = null;
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
      // vm.item.restaurant_id =  $auth.user.restaurant_id
      // vm.item.category_id = vm.item.category ?
      //                           vm.item.category.id : vm.selectedCategory.id;
      service(vm.item).then(function(product){
        if (product.errors) {
          errorsAlert(product.errors);
        }else{
          cancel();
          productData.callback(product);
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
