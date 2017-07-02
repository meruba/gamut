(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('NewOrders', NewOrdersController);

  function NewOrdersController(UserService) {
    var vm = this;

    vm.user = {};
    vm.users = [];
    vm.userForm = {};
    vm.nextStep = nextStep;
    vm.prevStep = prevStep;
    vm.showForm = false;
    vm.selectUser = selectUser;
    vm.userSelected = null;

    vm.optionsSearch = {
      service: UserService.searchUsers,
      placeholder: 'search-user',
      results: searchResults,
      show: true
    };

    vm.steps = [
      {
        templateUrl: 'asistent/orders/partials/form-basic.html',
        active: false,
        onClik: newCustomer,
        params: vm.userForm,
        active: true
      },
      {
        templateUrl: 'asistent/orders/partials/form-items.html',
        active: false,
        onClik: saveOrder,
        active: false
      }
    ];

    function searchResults(data) {
      vm.users = data.search;
    }

    function newCustomer(data) {
      UserService.newCustomer(data).then(function(user){
        vm.user = user;
        console.log(user);
      });
    }

    function saveOrder() {
      console.log('save');
    }

    function changeStep(current, add) {
      var index = add ? current + 1 : current - 1;
      vm.steps[index].active = true;
    }

    function nextStep(step, index) {
      if (index >= 0 && index < vm.steps.length - 1) {
        step.active = false;
        changeStep(index, true);
        // step.onClik(step.params);
      }
    }

    function prevStep(step, index) {
      if (index > 0 && index <= vm.steps.length) {
        step.active = false;
        changeStep(index, false);
      }
    }

    function selectUser(user) {
      vm.userSelected = user;
      console.log(user);
      vm.users = [];
      vm.showForm = true;
      vm.userForm = user;
    }
  }

})();
