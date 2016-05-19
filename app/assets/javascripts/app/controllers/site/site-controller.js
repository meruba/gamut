(function () {
  'use strict';

  angular
    .module('app.controllers')
    .controller('SiteController', SiteController);

  function SiteController($rootScope,
                          $auth) {

    $rootScope.$on('$stateChangeStart', function(event, toState){
      if (toState.name === 'login' && $auth.user.id) {
        event.preventDefault();
      }
    });

  }
})();
