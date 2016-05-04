(function () {
'use strict';

  angular
    .module('app.controllers')
    .controller('HomeController', HomeController);

  function HomeController($scope) {
    var vmHome = this;
    vmHome.test = 'Angular Loaded! :)';
  }

})();
