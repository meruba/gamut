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
        options: '=',
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
    var emitters = {
      clearInput: null,
      typing: null
    };

    vmSearch.search = search;
    vmSearch.reset = reset;

    init();

    function init(){
      vmSearch.show = vmSearch.options.show ? vmSearch.options.show : false;
      vmSearch.query = vmSearch.options.query || '';
      vmSearch.debounce = vmSearch.options.debounce || 400;
      vmSearch.service = vmSearch.options.service;
      vmSearch.results = vmSearch.options.results;
      placeholder(vmSearch.options.placeholder);

      if (vmSearch.options.onRegisterApi) {
        var api = createPublicApi();
        vmSearch.options.onRegisterApi(api);
      }
    }

    //Api
    function createPublicApi() {
      return {
        clearInput: clearInput,
        typing: typing,
        updateText: updateText
      };
    }

    function clearInput(cb){
      emitters.clearInput = cb;
    }

    function typing(cb){
      emitters.typing = cb;
    }

    function updateText(text) {
      vmSearch.query = text;
    }

    function placeholder(text) {
      if (text){
        vmSearch.placeholder = 'placeholder.' + text;
      }else{
        vmSearch.placeholder = '';
      }
    }

    function search(query) {
      if (emitters.typing) {
        emitters.typing(query);
      }

      if (vmSearch.query !== '' && vmSearch.query.length >= 3) {
        vmSearch.service(query).then(function(resp){
          vmSearch.results(resp);
        });
      }
    }

    function reset() {
      if (emitters.clearInput) {
        emitters.clearInput();
      }

      vmSearch.query = '';
    }

    $scope.$on('_SHOW_SEARCH_',function (ev, show) {
      vmSearch.show = show;
      if (!show) {
        reset();
      }
    });

  }

})();
