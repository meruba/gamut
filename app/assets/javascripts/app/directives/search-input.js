(function () {
  'use strict';

  angular
    .module('app.directives')
    .directive('searchInput', searchInput);

  function searchInput() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'directives/search-input/search-input.html',
      scope: {
        options: '='
      },
      controller: searchController,
      controllerAs: 'vmSearch',
      bindToController: true
    };

    return directive;
  }

  searchController.$inject = ['$scope'];

  function searchController($scope){

    var vmSearch = this;
    vmSearch.search = search;
    vmSearch.reset = reset;

    init();

    function init(){
      vmSearch.show = false;
      vmSearch.query = vmSearch.options.query || '';
      vmSearch.debounce = vmSearch.options.debounce || 400;
      vmSearch.service = vmSearch.options.service;
      placeholder(vmSearch.options.placeholder);
    }

    function placeholder(text) {
      if (text){
        vmSearch.placeholder = 'placeholder.' + text;
      }else{
        vmSearch.placeholder = '';
      }
    }

    function search(query) {
      vmSearch.service(query).then(function(resp){
        $scope.$emit('_SEARCH_RESULTS_', resp);
      });
    }

    function reset() {
      if (vmSearch.query !== '') {
        vmSearch.query = '';
        search(vmSearch.query);
      }
    }

    $scope.$on('_SHOW_SEARCH_',function (ev, show) {
      vmSearch.show = show;
      if (!show) {
        reset();
      }
    });

  }

})();
