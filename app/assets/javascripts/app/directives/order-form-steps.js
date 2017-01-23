(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('orderFormSteps', orderFormSteps);

  function orderFormSteps() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/order-form-steps/order-form-steps.html',
      scope: {
        data: '=',
        event: '&'
      },
      controller: formController,
      controllerAs: 'vmStep',
      bindToController: true
    };

    return directive;
  }

  formController.$inject = ['$scope', '$rootScope', 'UserService'];

  function formController($scope,
                          $rootScope,
                          UserService){

    var vmStep = this;
    vmStep.restaurants = vmStep.data || {};
    vmStep.load = true;

    init();

    function init() {
      step1();
      step2();
      step3();
    }
    /*settings step1 form*/
    function step1() {
      vmStep.step1 = {};
      vmStep.step1.userResults = [];
      vmStep.step1.totalResults = 0;
      vmStep.step1.option = 1;

      vmStep.step1.selectOption = selectOption;
      vmStep.step1.registerUser = registerUser;
      vmStep.step1.selectUser = selectUser;
      vmStep.step1.searchUser = searchUser;
    }

    function selectOption(index) {
      vmStep.step1.option = index;
      if (vmStep.step1.selectedUser) {
        vmStep.step1.hideForm = !vmStep.step1.hideForm;
        resetResults();
      }
    }

    function selectUser(user) {
      vmStep.step1.selectedUser = user;
      vmStep.step1.hideForm = true;
      resetResults();
    }

    function registerUser(form) {
      UserService.newUser(form).then(function(user){
        vmStep.step1.selectedUser = user;
        vmStep.step1.hideForm = true;
      });
    }

    function searchUser(query) {
      if (query.length > 3) {
        vmStep.load = false;
        UserService.searchUsers(query).then(function(resp){
          vmStep.step1.userResults = resp.search;
          vmStep.step1.totalResults = vmStep.step1.userResults.length;
          console.log(resp.search);
        }).finally(function(){
            vmStep.load = true;
        });
      }else{
        resetResults();
      }
    }

    function resetResults() {
      vmStep.step1.userResults = [];
      vmStep.step1.totalResults = 0;
    }

    /*settings step2 form*/
    function step2() {
      vmStep.step2 = {};
      vmStep.step2.showHeader = false;
      vmStep.step2.selectRest = selectRest;
      vmStep.step2.showRestaurants = showRestaurants;
    }

    function selectRest(rest, index) {
      if (vmStep.step2.selectedRest) {
        vmStep.step2.selectedRest.selected = false;
      }
      /*save scope content*/
      vmStep.step2.selectedRest = rest;
      /*add class new content selected*/
      rest.selected = true;
      toggleMenu(rest.products);
      hidRestaurants(index);
    }

    function toggleMenu(products) {
      vmStep.step2.showMenu = true;
      vmStep.step2.menu = products;
    }

    function hidRestaurants(index) {
      vmStep.step2.showHeader = true;
    }

    function showRestaurants() {
      vmStep.step2.showHeader = !vmStep.step2.showHeader;
      vmStep.step2.menu = [];
      /*reset check*/
      angular.forEach(vmStep.step3.itemsSelected, function(menu) {
        menu.selected = false;
      });
      vmStep.step3.itemsSelected = [];
      sendFields(vmStep.step3.itemsSelected);
    }

    /*settings step3 form*/
    function step3() {
      vmStep.step3 = {};
      vmStep.step3.itemsSelected = [];
      vmStep.step3.addProduct = addProduct;
    }

    function addProduct(menu) {
      menu.selected = menu.selected === undefined ? true : !menu.selected;
      if (menu.selected) {
        vmStep.step3.itemsSelected.push(menu);
      }else{
        var index = vmStep.step3.itemsSelected.indexOf(menu);
        vmStep.step3.itemsSelected.splice(index, 1);
      }
      sendFields(vmStep.step3.itemsSelected);
    }

    function sendFields(data) {
      $rootScope.$broadcast('_ORDER_FIELDS', data);
    }

  }

})();
