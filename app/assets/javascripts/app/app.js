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
    'focus-if',
    'ngAnimate',
    'toastr',
    'ngMessages'
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
      // .state('register', {
      //   url: '/register',
      //   templateUrl: 'users/register.html',
      //   controller: 'RegistrationController'
      // })
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
        controller: 'HeaderRestController as vmHeader',
        redirectTo: 'restaurant.list',
        resolve: {
          auth: ['$auth', '$state', function($auth, $state) {
            return $auth.validateUser()
              .catch(function(response) {
                $state.go('login');
              })
          }],
          actions: function() {
            return {
              newItem: function(){}
            };
          }
        },
        ncyBreadcrumb: {
          skip: true
        }
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
        },
        ncyBreadcrumb: {
          label: 'Restaurantes'
        }
      })
      .state('restaurant.new', {
        url: '/new',
        templateUrl: 'restaurants/new.html',
        controller: 'RestFormController as vmRest',
        ncyBreadcrumb: {
          label: 'Nuevo',
          parent: 'restaurant.list'
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
        },
        ncyBreadcrumb: {
          label: '{{vmRest.rest.name}}',
          parent: function($auth) {
            return $auth.user.role === 'admin' ? 'restaurant.list' : null;
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
        },
        ncyBreadcrumb: {
          label: 'Actualizar',
          parent: 'restaurant.show'
        }
      })
      .state('restaurant.menu', {
        url: '/{restId:int}/menu',
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
          parent: 'restaurant.show'
        }
      })
      .state('order', {
        url: '/order',
        templateUrl: 'orders/order-layout.html',
        redirectTo: 'order.list',
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
      .state('order.list', {
        url: '/list',
        templateUrl: 'orders/orders-list.html',
        controller: 'OrdersController as vmOrders',
        resolve: {
          ordersData: function (OrderService) {
            return OrderService.lastOrders().then(function(data) {
              return data;
            });
          }
        },
        ncyBreadcrumb: {
          label: 'Pedidos'
        }
      })
      .state('order.new', {
        url: '/new',
        templateUrl: 'orders/order-new.html',
        controller: 'OrderNewController as vmOrder',
        resolve: {
          restData: function (RestaurantService) {
            return RestaurantService.restaurants().then(function(data) {
              return data;
            });
          }
        },
        ncyBreadcrumb: {
          label: 'Nuevo'
        }
      })
      .state('order.custom', {
        url: '/custom',
        templateUrl: 'orders/order-custom.html',
        controller: 'OrderNewController as vmOrder',
        resolve: {
          restData: function (RestaurantService) {
            return RestaurantService.restaurants().then(function(data) {
              return data;
            });
          }
        },
        ncyBreadcrumb: {
          label: 'Nuevo'
        }
      })
      .state('app', {
        url: '/app',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('app.asistent', {
        url: '/asistent',
        abstract: true,
        template: '<ui-view/>',
        resolve: {
          auth: ['$auth', '$state', function($auth, $state) {
            return $auth.validateUser()
              .catch(function(response) {
                $state.go('login');
              })
          }]
        }
      })
      .state('app.asistent.users', {
        url: '/user',
        template: '<ui-view/>'
      })
      .state('app.asistent.users.list', {
        url: '/list',
        templateUrl: 'asistent/users/list.html',
        controller: 'UserList as vm',
        resolve: {
          users: function (UserService) {
            return UserService.customers().then(function(data) {
              return data.users;
            });
          }
        },
      })
      .state('app.asistent.orders', {
        url: '/orders',
        template: '<ui-view/>'
      })
      .state('app.asistent.orders.new', {
        url: '/new',
        templateUrl: 'asistent/orders/new.html',
        controller: 'NewOrders as vm',
        resolve: {
          restaurants: function (RestaurantService) {
            return RestaurantService.restaurants().then(function(data) {
              return data.restaurants;
            });
          }
        }
      })
      .state('app.asistent.orders.edit', {
        url: '/edit/{orderId:int}/user/{userId:int}',
        templateUrl: 'asistent/orders/new.html',
        controller: 'EditOrdersCtrl as vm',
        resolve: {
          restaurants: function (RestaurantService) {
            return RestaurantService.restaurants().then(function(data) {
              return data.restaurants;
            });
          },
          order: function (OrderService, $stateParams) {
            var orderId = $stateParams.orderId;
            return OrderService.order(orderId).then(function(data) {
              return data;
            });
          },
          user: function (UserService, $stateParams) {
            var userId = $stateParams.userId;
            return UserService.user(userId).then(function(data) {
              return data;
            });
          },
        }
      })
      .state('app.asistent.orders.list', {
        url: '/list',
        templateUrl: 'asistent/orders/list.html',
        controller: 'OrderListCtrl as vm',
        resolve: {
          orders: function (OrderService) {
            return OrderService.lastOrders().then(function(data) {
              return data.orders;
            });
          }
        }
      })
      .state('app.asistent.restaurants', {
        url: '/restaurants',
        template: '<ui-view/>'
      })
      .state('app.asistent.restaurants.admin', {
        url: '/admin',
        templateUrl: 'asistent/restaurants/index.html',
        controller: 'RestaurantsCtrl as vm',
        resolve: {
          restaurants: function (RestaurantService) {
            return RestaurantService.restaurants().then(function(data) {
              return data.restaurants;
            });
          }
        }
      });
    $urlRouterProvider.otherwise('/login');
  });

})();
