(function(){
  'use strict';

  angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.services',
    'pascalprecht.translate',
    'ui.router',
    'templates',
    'ng-token-auth',
    'toastr'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $authProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'users/login.html',
        controller: 'SessionController'
      })
      .state('logout', {
        url: '/logut',
        controller: 'AuthController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'users/register.html',
        controller: 'RegistrationController'
      })
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController as vmHome'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'users/users-list.html',
        controller: 'UsersController as vmUsers',
        resolve: {
          auth: ['$auth', '$state', function($auth, $state) {
            return $auth.validateUser()
              .catch(function(response) {
                $state.go('login');
              })
          }],
          usersData: function (UserService) {
            return UserService.users().then(function(data) {
              return data;
            });
          }
        }
      })
      .state('user', {
        url: '/user/{userId:int}',
        templateUrl: 'users/user.html',
        controller: 'UserController as vmUser',
        resolve: {
          auth: ['$auth', '$state', function($auth, $state) {
            return $auth.validateUser()
              .catch(function(response) {
                $state.go('login');
              })
          }],
          userData: function (UserService, $stateParams) {
            var id = $stateParams.userId;
            return UserService.user(id).then(function(data) {
              return data;
            });
          }
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
