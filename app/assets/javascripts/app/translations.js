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
          email: 'Correo del restaurante',
          logo: 'Logo',
          address: 'Dirección',
          telephone: 'Teléfono',
          delivery_time: 'Tiempo de envio',
          open_time: 'Hora de apertura',
          close_time: 'Hora de cierre',
          open_close_time: 'Horario de atención',
          account: 'Cuenta'
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
        'save': 'Guardar',
        'update': 'Actualizar',
        'new': 'Nuevo',
        'edit': 'Editar',
        'cancel': 'Cancelar',
        'add': 'Agregar',
        'uploadImage': 'Actualizar imagen',
        'updateInfoUser': 'Actualizar información'
      },
      placeholder: {
        'search-user': 'Nombre de usuario o identificación',
        'search-restaurant': 'Nombre del restaurante o dirección',
        'search-product': 'Nombre del producto',
        'new-category': 'Ingrese una categoria',
        'select-category': 'Seleccione una categoria'
      },
      'empty-states':{
        'general': 'No se encontro resultados',
        'tip-user': 'Intenta escribiendo nuevamente...',
        'menu': 'Bienvenido(a)',
        'tip-menu': 'Puedes registrar tu menu desde el boton de la derecha'
      }
    });

    $translateProvider.preferredLanguage('es');
  });
})();
