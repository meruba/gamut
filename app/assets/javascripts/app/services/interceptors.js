(function () {
'use strict';

  angular
    .module('app.services')
    .factory('interceptorService', interceptorService);

  function interceptorService($injector, $window, $q) {

    var service = {
      responseError: responseError
    };

    return service;

    function responseError(rejection) {
      switch (rejection.status) {
        case 401:
          $injector.get('$state').go('login');
          break;
        case 403:
          $window.location = './403.html';
          break;
        case 404:
          // $window.location = './404.html';
          break;
        // case 500:
        //   $window.location = './500.html';
        //   break;
       }
      return $q.reject(rejection);
    };
  }

})();
