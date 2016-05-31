(function(){
  'use strict';
  angular.module('app')
  .config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
      templateUrl: 'shared/breadcrumbs.html'
    });
  });
})();
