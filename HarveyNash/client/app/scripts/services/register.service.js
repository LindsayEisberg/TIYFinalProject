(function () {
  "use strict";

  angular.module('app')
    .factory('AuthService', function ($http, LocalService) {
      function checkTokenStatus(token)  {
        $http.get('http://localhost:3000/api/v1/auth/token_status?token=' + token);
      }

      var token = LocalService.get('auth_token');

      if(token) {
        token = angular.fromJson(LocalService.get('auth_token')).token;
        checkTokenStatus(token);
      }

      return {
        // authorize: function(access) {
        //   if(access === AccessLevels.user) {
        //     return this.isAuthenticated();
        //   } else {
        //     return true;
        //   }
        // },
        isAuthenticated: function () {
          return LocalService.get('auth_token');
        },
        login: function(credentials) {
          var login = $http.post('http://localhost:3000/api/v1/auth', credentials);
          login.success(function(result) {
            LocalService.set('auth_token', JSON.stringify(result));
          });
          return login;
        },
        logout: function() {
          LocalService.unset('auth_token');
        },
        register: function(formData) {
          LocalService.unset('auth_token');
          var register = $http.post('http://localhost:3000/api/v1/register', formData);
          register.success(function(result) {
            LocalService.set('auth_token', JSON.stringify(result));
          });
          return register;
        }
      };
    })

    .factory('AuthInterceptor', function($q, $injector, $location) {
      var LocalService = $injector.get('LocalService');
      var token = LocalService.get('auth_token');

      return {
        request: function(config) {
          if(LocalService.get('auth_token')) {
            token = angular.fromJson(LocalService.get('auth_token')).token;
          }
          if (token) {
            config.headers.Authorization = 'Bearer ' + token;
          }
          return config;
        },
        responseError: function(response) {
          if(response.status === 401 || response.status === 403 || response.status === 406) {
            LocalService.unset('auth_token');
            $injector.get('$location').path('/login');
          }
          return $q.reject(response);
        }
      };
    })
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    });

})();
