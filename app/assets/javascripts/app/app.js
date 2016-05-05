(function(){
  'use strict';

  angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.services',
    'ui.router',
    'templates',
    'ng-token-auth',
    'toastr'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'SessionController'
      })
      .state('logout', {
        url: '/logut',
        controller: 'AuthController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'RegistrationController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController as vmHome'
      })
      .state('home.users', {
        url: 'users',
        templateUrl: 'users/users-list.html',
        controller: 'UsersController as vmUsers',
        resolve: {
            auth: ['$auth', '$state', function($auth, $state) {
              return $auth.validateUser()
                .catch(function(response) {
                  $state.go('login');
                })
            }]
          }
      });
    $urlRouterProvider.otherwise('/login');
  });

  angular.module('app').run(['$auth','$state', function($auth, $state) {
    $auth.validateUser()
        .then(function(user) {
          if (!user.id) {
            $state.go('home');
          }
        });
  }]);

})();
