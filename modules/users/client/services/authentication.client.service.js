(function () {
  'use strict';

  // Authentication service for user variables

  angular
    .module('app.users.services')
    .factory('Authentication', Authentication);

  Authentication.$inject = ['$localStorage'];

  function Authentication($localStorage) {
      return {
        user: $localStorage.user || null
    };
  }
}());
