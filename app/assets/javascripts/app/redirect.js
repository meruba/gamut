(function(){
  'use strict';
  angular.module('app')
  .run(function ($rootScope,
                $state) {
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params)
      }
    });
  });
})();
