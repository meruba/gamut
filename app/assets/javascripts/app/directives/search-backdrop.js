(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('searchBackdrop', searchBackdrop);

  function searchBackdrop() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/search-backdrop/search-backdrop.html',
      scope: {
        options: '=',
      },
      controller: searchController,
      controllerAs: 'sb',
      bindToController: true
    };

    return directive;
  }

  searchController.$inject = ['$scope', 'UserService'];

  function searchController($scope, UserService){

    var sb = this;
    sb.openSearch = openSearch;
    sb.selectedResult = selectedResult;
    sb.close = close;

    init();

    function init(){
      sb.label = sb.options.label;
      sb.success = sb.options.selected ? sb.options.selected : function() {};
      sb.optionsSearch = {
        show: true,
        service: UserService.searchUsers,
        placeholder: 'search-user',
        results: searchResults
      };
    }

    function openSearch() {
      sb.fullDisplay = true;
    }

    function searchResults(data) {
      sb.results = data.search;
    }

    function close() {
      sb.fullDisplay = false;
      sb.results = [];
    }

    function selectedResult(item) {
      sb.success(item);
      close();
    }

  }

})();
