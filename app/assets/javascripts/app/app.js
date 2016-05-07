(function(){
  'use strict';

  angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.services',
    'ui.identicon',
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
      .state('user', {
        url: '/user',
        templateUrl: 'users/user-layout.html',
        resolve: {
          auth: ['$auth', '$state', function($auth, $state) {
            return $auth.validateUser()
              .catch(function(response) {
                $state.go('login');
              })
          }]
        }
      })
      .state('user.list', {
        url: '/list',
        templateUrl: 'users/users-list.html',
        controller: 'UsersController as vmUsers',
        resolve: {
          usersData: function (UserService) {
            return UserService.users().then(function(data) {
              return data;
            });
          }
        }
      })
      .state('user.show', {
        url: '/{userId:int}/show',
        templateUrl: 'users/user.html',
        controller: 'UserController as vmUser',
        resolve: {
          userData: function (UserService, $stateParams) {
            var id = $stateParams.userId;
            return UserService.user(id).then(function(data) {
              return data;
            });
          }
        }
      })
      .state('user.edit', {
        url: '/{userId:int}/edit',
        templateUrl: 'users/edit.html',
        controller: 'UserController as vmUser',
        resolve: {
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
          $state.go('login');
        }
      });
  }]);

})();
