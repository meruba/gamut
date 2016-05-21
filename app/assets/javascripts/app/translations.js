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
        restaurants: 'Restaurantes',
        restaurant: 'Mi Restaurante',
        menu_rest: 'Mi Menu',
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
      restaurant: {
        restaurant: 'Restaurante',
        restaurants: 'Restaurantes',
        attributes: {
          owner: 'Representante',
          name: 'Nombre del local',
          email: 'Correo',
          logo: 'Logo',
          address: 'Dirección',
          telephone: 'Teléfono',
          delivery_time: 'Tiempo de envio',
          open_time: 'Hora de apertura',
          close_time: 'Hora de cierre'
        },
        progress: 'Información %'
      },
      product: {
        attributes:{
          name: 'Nombre',
          category: 'Categoria',
          price: 'Precio',
          description: 'Description'
        }
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
        'user-list': 'Usuarios',
        'restaurant-list': 'Restaurantes',
        'restaurant-menu': 'Mi Menú',
        'menu': 'Agregar menu'
      },
      action: {
        save: 'Guardar',
        update: 'Actualizar',
        new: 'Nuevo',
        edit: 'Editar',
        cancel: 'Cancelar',
        uploadImage: 'Actualizar imagen',
        updateInfoUser: 'Actualizar información'
      },
      placeholder: {
        'search-user': 'Nombre de usuario o identificación'
      },
      'empty-states':{
        'general': 'No se encontro resultados',
        'tip-user': 'Intenta escribiendo nuevamente...'
      }
    });

    $translateProvider.preferredLanguage('es');
  });
})();
