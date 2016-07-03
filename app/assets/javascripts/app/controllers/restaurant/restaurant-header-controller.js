(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('HeaderRestController', HeaderRestController);

  function HeaderRestController($state,
                                $rootScope) {

    var vmHeader = this;
    vmHeader.searchForm = false;
    vmHeader.totalRest = 0;
    vmHeader.toggleSearch = toggleSearch;
    vmHeader.toggleShow = toggleShow

    init();

    function init() {
      vmHeader.showNewMenu = ($state.current.name === 'restaurant.menu');
      vmHeader.showNewRest = ($state.current.name === 'restaurant.list');
    }

    function toggleShow() {
      vmHeader.showForm = !vmHeader.showForm;
    }

    function toggleSearch() {
      vmHeader.searchForm = !vmHeader.searchForm;
      $rootScope.$broadcast('_SHOW_SEARCH_RESTAURANT_',vmHeader.searchForm);
    }

  }

})();
