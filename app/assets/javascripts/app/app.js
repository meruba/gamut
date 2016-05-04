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
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'AuthController',
        onEnter: function ($state, Auth) {
          Auth.currentUser().then(function (user){
            if (user) {
              $state.go('home.users');
            }else{
              $state.go('home');
            }
          });
        }
      })
      .state('logout', {
        url: '/logut',
        controller: 'AuthController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'AuthController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController as vmHome'
      })
      .state('home.users', {
        url: 'users',
        templateUrl: 'users/users-list.html',
        controller: 'UsersController as vmUsers'
      });
    $urlRouterProvider.otherwise('/');
  });

})();
