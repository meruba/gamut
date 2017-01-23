(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('HeaderRestController', HeaderRestController);

  function HeaderRestController($state,
                                $rootScope,
                                actions) {

    var vmHeader = this;
    vmHeader.searchForm = false;
    vmHeader.totalRest = 0;
    vmHeader.toggleSearch = toggleSearch;
    vmHeader.newItem = newItem

    init();

    function init() {
      vmHeader.showNewMenu = ($state.current.name === 'restaurant.menu');
      vmHeader.showNewRest = ($state.current.name === 'restaurant.list');
    }

    function newItem() {
      /*comunicate header and menu*/
      actions.newItem();
    }

    function toggleSearch() {
      vmHeader.searchForm = !vmHeader.searchForm;
      $rootScope.$broadcast('_SHOW_SEARCH_', vmHeader.searchForm);
    }

  }

})();
