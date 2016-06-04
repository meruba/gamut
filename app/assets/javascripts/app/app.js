(function(){
  'use strict';

  angular.module('app', [
    'app.controllers',
    'app.directives',
    'app.services',
    'ui.identicon',
    'ui.bootstrap',
    'pascalprecht.translate',
    'ncy-angular-breadcrumb',
    'ui.router',
    'templates',
    'ng-token-auth',
    'ngFileUpload',
    'toastr'
  ])

  .config(function ($stateProvider,
                    $urlRouterProvider,
                    $httpProvider) {

    $httpProvider.interceptors.push('interceptorService');
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
        controller: 'HeaderUserController as vmHeader',
        redirectTo: 'user.list',
        resolve: {
          auth: ['$auth', '$state', function($auth, $state) {
            return $auth.validateUser()
              .catch(function(response) {
                $state.go('login');
              })
          }]
        },
        ncyBreadcrumb: {
          skip: true
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
        },
        ncyBreadcrumb: {
          label: 'Usuarios'
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
        },
        ncyBreadcrumb: {
          label: '{{vmUser.userData.name}}',
          parent: function($auth) {
            return $auth.user.role === 'admin' ? 'user.list' : null;
          }
        }
      })
      .state('user.edit', {
        url: '/{userId:int}/edit',
        templateUrl: 'users/edit.html',
        controller: 'UpdateUserController as vmUser',
        resolve: {
          userData: function (UserService, $stateParams) {
            var id = $stateParams.userId;
            return UserService.user(id).then(function(data) {
              return data;
            });
          }
        },
        ncyBreadcrumb: {
          label: 'Actualizar',
          parent: function($auth) {
            return $auth.user.role === 'admin' ? 'user.show' : null;
          }
        }
      });
    $urlRouterProvider.otherwise('/login');
  });


})();
