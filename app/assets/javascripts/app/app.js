(function(){
  'use strict';

  angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.services',
    'ui.router',
    'Devise',
    'templates'
  ])

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController as vmHome'
      })
      .state('home.login', {
        url: 'login',
        templateUrl: 'auth/login.html',
        controller: 'AuthController',
        onEnter: function ($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home.users');
          });
        }
      })
      .state('home.register', {
        url: 'register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController',
        onEnter: function ($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home.users');
          });
        }
      })
      .state('home.users', {
        url: 'users',
        templateUrl: 'user/users.html',
        controller: 'UsersController'
      });
    $urlRouterProvider.otherwise('/');
  });

})();
