(function(){
  'use strict';
  angular.module('app')
  .config(function ($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('escapeParameters');

    $translateProvider.translations('en', {
      menu: {
        menu: 'Menu',
        users: 'Users',
        logout: 'Logout'
      },
      user: {
        user: 'User',
        users: 'Users'
      },
      dashboard: {
        welcome: 'Welcome'
      },
      login: {
        'login': 'Login',
        'email': 'Email',
        'password': 'Password',
        'name': 'Name'
      }
    });

    $translateProvider.translations('es', {
      menu: {
        menu: 'Menú',
        users: 'Usuarios',
        logout: 'Salir'
      },
      user: {
        user: 'Usuario',
        users: 'Usuarios',
        attributes: {
          name: 'Nombres',
          email: 'Correo',
          username: 'Username',
          address: 'Dirección',
          identification: 'Cédula',
          telephone: 'Teléfono'
        },
        role: {
          restaurant: 'restaurante',
          customer: 'cliente',
          admin: 'administrador'
        },
        progress: 'Información %'
      },
      dashboard: {
        welcome: 'Bienvenido'
      },
      login: {
        'login': 'Iniciar Sesión',
        'email': 'Correo',
        'password': 'Contraseña',
        'name': 'Nombres',
        'password_confirmation': 'Confirmar contraseña',
        'info_register': 'Tengo una cuenta',
        'info_login': 'No eres usuario?'
      },
      signup: {
        'signup': 'Registrarse'
      },
      title: {
        'user-list': 'Usuarios'
      }
    });

    $translateProvider.preferredLanguage('es');
  });
})();
