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
      })
      .state('user.restaurant', {
        url: '/{userId:int}/restaurant',
        templateUrl: 'restaurants/restaurant.html',
        controller: 'RestaurantController as vmRest',
        resolve: {
          restData: function (UserService, $stateParams) {
            var id = $stateParams.userId;
            return UserService.restaurant(id).then(function(data) {
              return data;
            });
          }
        }
      })
      .state('restaurant', {
        url: '/restaurant',
        templateUrl: 'restaurants/restaurant-layout.html',
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
      .state('restaurant.new', {
        url: '/new',
        templateUrl: 'restaurants/new.html',
        controller: 'RestFormController as vmRest'
      })
      .state('restaurant.list', {
        url: '/list',
        templateUrl: 'restaurants/restaurants-list.html',
        controller: 'RestaurantsController as vmRest',
        resolve: {
          restData: function (RestaurantService) {
            return RestaurantService.restaurants().then(function(data) {
              return data;
            });
          }
        }
      })
      .state('restaurant.show', {
        url: '/{restId:int}/show',
        templateUrl: 'restaurants/restaurant.html',
        controller: 'RestaurantController as vmRest',
        resolve: {
          restData: function (RestaurantService, $stateParams) {
            var id = $stateParams.restId;
            return RestaurantService.restaurant(id).then(function(data) {
              return data;
            });
          }
        }
      })
      .state('restaurant.edit', {
        url: '/{restId:int}/edit',
        templateUrl: 'restaurants/edit.html',
        controller: 'UpdateRestController as vmRest',
        resolve: {
          restData: function (RestaurantService, $stateParams) {
            var id = $stateParams.restId;
            return RestaurantService.restaurant(id).then(function(data) {
              return data;
            });
          }
        }
      })
      .state('restaurant.menu', {
        url: '/{restId:int}/menu',
        templateUrl: 'restaurants/menu/main.html',
        redirectTo: 'restaurant.menu.list',
        ncyBreadcrumb: {
          skip: true
        }
      })
      .state('restaurant.menu.list', {
        url: '/list',
        templateUrl: 'restaurants/menu/list.html',
        controller: 'MenuRestController as vmRest',
        resolve: {
          restMenu: function (RestaurantService, $stateParams) {
            var id = $stateParams.restId;
            return RestaurantService.menu(id).then(function(data) {
              return data;
            });
          }
        },
        ncyBreadcrumb: {
          label: 'Menú',
          parent: 'restaurant.menu'
        }
      })
      .state('restaurant.menu.product', {
        url: '/product',
        templateUrl: 'restaurants/menu/new.html',
        controller: 'MenuController as vmMenu',
        resolve: {
          categories: function (RestaurantService) {
            return RestaurantService.categories().then(function(data) {
              return data.categories;
            });
          }
        },
        ncyBreadcrumb: {
          label: 'Agregar menú',
          parent: 'restaurant.menu.list'
        }
      });
    $urlRouterProvider.otherwise('/login');
  });

})();
